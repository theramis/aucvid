import got from "got";
import { HomePageProps } from "../pages";
import { DhbData } from "../types/DhbData";
import { DateTime } from "luxon";

const firstDoseTargetPercentage = 0.9;
const secondDoseTargetPercentage = 0.9;
const cacheTtlInMins = 30;
const covidSiteUrl =
  "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data";

// making it global so hopefully it gets cached by lambda
let data: any = null;

export default async function fetchData(): Promise<HomePageProps> {
  if (data == null || isDataCacheExpired(data, cacheTtlInMins)) {
    data = await getData();
  }

  return data;
}

async function getData(): Promise<HomePageProps> {
  const response = await got(covidSiteUrl);
  const rawHtml = response.body;

  const aucklandDhbData = extractDhbData(rawHtml, "Auckland");
  const waitemataDhbData = extractDhbData(rawHtml, "Waitemata");
  const countiesManukauDhbData = extractDhbData(rawHtml, "Counties Manukau");
  const combinedAucklandDhbData = combineDhbData(
    waitemataDhbData,
    aucklandDhbData,
    countiesManukauDhbData
  );
  return {
    waitemata: waitemataDhbData,
    auckland: aucklandDhbData,
    countiesManukau: countiesManukauDhbData,
    combinedAuckland: combinedAucklandDhbData,
    dataValidAsAtTimeUtc: extractDailyUpdatedTime(rawHtml).toUTC().toISO(),
    dataFetchedAtTimeUtc: DateTime.now().toUTC().toISO(),
  };
}

const extractDailyUpdatedTime = (rawHtml: string): DateTime => {
  // extracts a date like "11:59pm 24 October 2021"
  const match =
    /Data\sin\sthis\ssection\sis\sas\sat\s([0-9]+):([0-9]+)(am|pm)\s([0-9]+)\s(.*?)\s([0-9]+)\sand\sis\supdated\sdaily/g.exec(
      rawHtml
    )!;

  const hour = convertToNumber(match[1]);
  const minute = convertToNumber(match[2]);
  const isPm = match[3] === "pm";
  const date = convertToNumber(match[4]);
  const month = getMonthFromString(match[5]);
  const year = convertToNumber(match[6]);

  return DateTime.fromObject(
    {
      day: date,
      year: year,
      month: month,
      hour: isPm ? hour + 12 : hour,
      minute: minute,
    },
    { zone: "Pacific/Auckland" }
  );
};

function extractDhbData(rawHtml: string, dhbName: string): DhbData {
  const dbhRowRegex = new RegExp(
    `<th nowrap="nowrap">${dhbName}<\/th>.*?<\/tr>`,
    "gs"
  );
  const dhbHtml = dbhRowRegex.exec(rawHtml);

  const valuesRegex = new RegExp(
    '<td style="text-align:right">(.*?)</td>',
    "gs"
  );
  const c = dhbHtml![0].match(valuesRegex) as RegExpExecArray;

  const firstDosesPercentage = convertToNumber(extractValue(c[1])) / 100;
  const secondDosesPercentage = convertToNumber(extractValue(c[4])) / 100;

  return {
    numOfFirstDoses: convertToNumber(extractValue(c[0])),
    firstDosesPercentage,
    hasMetFirstDoseTarget: firstDosesPercentage >= firstDoseTargetPercentage,
    numOfFirstDosesTo90Percent: convertToNumber(extractValue(c[2])),
    numOfSecondDoses: convertToNumber(extractValue(c[3])),
    secondDosesPercentage,
    hasMetSecondDoseTarget: secondDosesPercentage >= secondDoseTargetPercentage,
    numOfSecondDosesTo90Percent: convertToNumber(extractValue(c[5])),
    totalPopulation: convertToNumber(extractValue(c[6])),
  };
}

const extractValue = (s: string): string =>
  s.replace('<td style="text-align:right">', "").replace("</td>", "");

const convertToNumber = (s: string): number => Number(s.replace(/[%,]/g, ""));

const combineDhbData = (...data: DhbData[]): DhbData => {
  const combinedData: DhbData = {
    numOfFirstDoses: 0,
    firstDosesPercentage: 0,
    hasMetFirstDoseTarget: false,
    numOfFirstDosesTo90Percent: 0,
    numOfSecondDoses: 0,
    secondDosesPercentage: 0,
    hasMetSecondDoseTarget: false,
    numOfSecondDosesTo90Percent: 0,
    totalPopulation: 0,
  };

  data.forEach((d) => {
    combinedData.numOfFirstDoses += d.numOfFirstDoses;
    combinedData.numOfFirstDosesTo90Percent += d.numOfFirstDosesTo90Percent;
    combinedData.numOfSecondDoses += d.numOfSecondDoses;
    combinedData.numOfSecondDosesTo90Percent += d.numOfSecondDosesTo90Percent;
    combinedData.totalPopulation += d.totalPopulation;
    combinedData.firstDosesPercentage = roundTo2Dp(
      combinedData.numOfFirstDoses / combinedData.totalPopulation
    );
    combinedData.hasMetFirstDoseTarget =
      combinedData.firstDosesPercentage > firstDoseTargetPercentage;
    combinedData.secondDosesPercentage = roundTo2Dp(
      combinedData.numOfSecondDoses / combinedData.totalPopulation
    );
    combinedData.hasMetSecondDoseTarget =
      combinedData.secondDosesPercentage > secondDoseTargetPercentage;
  });

  return combinedData;
};

const roundTo2Dp = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;

const getMonthFromString = (s: string) =>
  new Date(Date.parse(s + " 1, 2012")).getMonth() + 1;

const isDataCacheExpired = (data: HomePageProps, ttl: number) =>
  DateTime.utc().diff(DateTime.fromISO(data.dataFetchedAtTimeUtc), "minutes")
    .minutes >= ttl;
