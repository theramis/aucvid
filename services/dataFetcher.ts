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

  return {
    waitemata: extractDhbData(rawHtml, "Waitemata"),
    auckland: extractDhbData(rawHtml, "Auckland"),
    countiesManukau: extractDhbData(rawHtml, "Counties Manukau"),
    dataUpdatedTime: extractDailyUpdatedTime(rawHtml),
    lastRetrievedTime: new Date().toISOString(),
  };
}

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
    firstDosesPercentage: convertToNumber(extractValue(c[1])),
    numOfFirstDosesTo90Percent: convertToNumber(extractValue(c[2])),
    numOfSecondDoses: convertToNumber(extractValue(c[3])),
    secondDosesPercentage: convertToNumber(extractValue(c[4])),
    numOfSecondDosesTo90Percent: convertToNumber(extractValue(c[5])),
    totalPopulation: convertToNumber(extractValue(c[6])),
  };
}

const extractValue = (s: string): string =>
  s.replace('<td style="text-align:right">', "").replace("</td>", "");

const convertToNumber = (s: string): number => Number(s.replace(/[%,]/g, ""));
