import got from "got";
import { DateTime } from "luxon";
import { DhbPopulationDoseData, VaccineData } from "../types/VaccineDataTypes";
import { CONSTANTS } from "./constants";

export default async function getVaccineData(): Promise<VaccineData> {
  const response = await got(CONSTANTS.mohVaccineDataSiteUrl);
  const rawHtml = response.body;

  return {
    vaccinationsPerDhb: getVaccinationDataPerDhb(rawHtml),
    dataValidAsAtTimeUtc: extractDailyUpdatedTime(rawHtml),
  };
}

const getVaccinationDataPerDhb = (rawHtml: string): DhbPopulationDoseData[] => {
  const vaccinationTo90PerDhbTableHtml =
    /Vaccinations\sto\s90%\sby\sDHB\<\/h3\>.*?\<tbody\>(.*?)\<\/tbody\>/gs.exec(
      rawHtml
    )![1];

  const perDhbRegex =
    /nowrap\"\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<firstDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs;

  const vaccinationDataPerDhb: DhbPopulationDoseData[] = [];
  let match;
  while ((match = perDhbRegex.exec(vaccinationTo90PerDhbTableHtml)) !== null) {
    const dhbDoseData = createPopulationDoseDataForDhbFromRegexMatch(match);

    if (dhbDoseData.dhbName.includes("Total")) {
      // this means we have reached the bottom of the table and all DHBs have been parsed
      break;
    }

    vaccinationDataPerDhb.push(dhbDoseData);
  }
  return vaccinationDataPerDhb;
};

const createPopulationDoseDataForDhbFromRegexMatch = (
  match: RegExpExecArray
): DhbPopulationDoseData => {
  const firstDosesPercentage =
    convertToNumber(match.groups!.firstDosesPercentage) / 100;
  const secondDosesPercentage =
    convertToNumber(match.groups!.secondDosesPercentage) / 100;

  return {
    dhbName: match.groups!.DhbName,
    numOfFirstDoses: convertToNumber(match.groups!.firstDoses),
    firstDosesPercentage,
    hasMetFirstDoseTarget:
      firstDosesPercentage >= CONSTANTS.firstDoseTargetPercentage,
    numOfFirstDosesTo90Percent: convertToNumber(
      match.groups!.firstDosesToReach90Percent
    ),
    numOfSecondDoses: convertToNumber(match.groups!.secondDoses),
    secondDosesPercentage,
    hasMetSecondDoseTarget:
      secondDosesPercentage >= CONSTANTS.secondDoseTargetPercentage,
    numOfSecondDosesTo90Percent: convertToNumber(
      match.groups!.secondDosesToReach90Percent
    ),
    totalPopulation: convertToNumber(match.groups!.totalPopulation),
  };
};

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

const convertToNumber = (s: string): number => Number(s.replace(/[%,]/g, ""));

const getMonthFromString = (s: string) =>
  new Date(Date.parse(s + " 1, 2012")).getMonth() + 1;
