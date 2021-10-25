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
    lastRetrievedTime: new Date().toISOString(),
  };
}

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
    numOfFirstDoses: c[0]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    firstDosesPercentage: c[1]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    numOfFirstDosesTo90Percent: c[2]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    numOfSecondDoses: c[3]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    secondDosesPercentage: c[4]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    numOfSecondDosesTo90Percent: c[5]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    totalPopulation: c[6]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
  };
}
