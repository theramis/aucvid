import got from "got";
import { HomePageProps } from "../pages";
import { DhbData } from "../types/DhbData";

const covidSiteUrl =
  "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data";

// making it global so hopefully it gets cached by lambda
let data: any = null;

export default async function fetchData(): Promise<HomePageProps> {
  if (data == null) {
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
    dataUpdatedTime: extractDailyUpdatedTime(rawHtml),
    lastRetrievedTime: new Date().toISOString(),
  };
}

// returns a string like "11:59pm 24 October 2021"
const extractDailyUpdatedTime = (rawHtml: string): string =>
  /Data\sin\sthis\ssection\sis\sas\sat\s(.*?)\sand\sis\supdated\sdaily/g.exec(
    rawHtml
  )![1];

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

  return {
    numOfFirstDoses: convertToNumber(extractValue(c[0])),
    firstDosesPercentage: convertToNumber(extractValue(c[1])) / 100,
    numOfFirstDosesTo90Percent: convertToNumber(extractValue(c[2])),
    numOfSecondDoses: convertToNumber(extractValue(c[3])),
    secondDosesPercentage: convertToNumber(extractValue(c[4])) / 100,
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
    numOfFirstDosesTo90Percent: 0,
    numOfSecondDoses: 0,
    secondDosesPercentage: 0,
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
    combinedData.secondDosesPercentage = roundTo2Dp(
      combinedData.numOfSecondDoses / combinedData.totalPopulation
    );
  });

  return combinedData;
};

const roundTo2Dp = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
