import { Handler, APIGatewayEvent } from "aws-lambda";
import got from "got";

let data: any = null;

const handler: Handler = async (event: APIGatewayEvent): Promise<any> => {
  if (data == null) {
    data = await getData();
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Cache-Control": "public, s-maxage=1800",
      "Content-Type": "application/json",
    },
  };
};

export { handler };

const covidSiteUrl =
  "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-vaccine-data";

export async function getData() {
  const response = await got(covidSiteUrl);
  const rawHtml = response.body;
  console.log(rawHtml);
  return {
    waitemata: extractDhbData(rawHtml, "Waitemata"),
    auckland: extractDhbData(rawHtml, "Auckland"),
    countiesManukau: extractDhbData(rawHtml, "Counties Manukau"),
  };
}

function extractDhbData(rawHtml: string, dhbName: string) {
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
    firstDoses: c[0]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    firstDosesPercentage: c[1]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    firstDosesTo90: c[2]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    secondDoses: c[3]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    secondDosesPercentage: c[4]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    secondDosesTo90: c[5]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
    totalPopulation: c[6]
      .replace('<td style="text-align:right">', "")
      .replace("</td>", ""),
  };
}
