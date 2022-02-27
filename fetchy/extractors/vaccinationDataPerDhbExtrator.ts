import { DateTime } from "luxon";
import {
  DhbName,
  DhbVaccineDoseData,
} from "../../shared/types/VaccineDataTypes";
import { convertToNumber } from "../utilities";

export const getVaccinationDataPerDhb = (
  dailyUpdatedNzTimeFromHtml: DateTime,
  rawHtml: string
): DhbVaccineDoseData[] => {
  const rawHtmlDate = new Date(
    dailyUpdatedNzTimeFromHtml.year,
    dailyUpdatedNzTimeFromHtml.month,
    dailyUpdatedNzTimeFromHtml.day
  );

  if (rawHtmlDate > new Date(2022, 2, 16)) {
    return extractDhbDataAfter_16_02_22(rawHtml);
  }

  if (rawHtmlDate > new Date(2022, 2, 15)) {
    return extractDhbDataAfter_15_02_22(rawHtml);
  }

  return defaultExtractDhbData(rawHtml);
};

const extractDhbDataAfter_16_02_22 = (rawHtml: string): DhbVaccineDoseData[] =>
  extractDataFromHtml(
    rawHtml,
    /\<a id=\"dhbtables all ethnicities" name="dhbtables all ethnicities\"\>\<\/a\>.*?\<\/h4\>.*?\<tbody\>(.*?)\<\/tbody\>/gs,
    /nowrap\"\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs
  );

const extractDhbDataAfter_15_02_22 = (rawHtml: string): DhbVaccineDoseData[] =>
  extractDataFromHtml(
    rawHtml,
    /\<a id=\"dhbtables all ethnicities" name="dhbtables all ethnicities\"\>\<\/a\>.*?\<\/h4\>.*?\<tbody\>(.*?)\<\/tbody\>/gs,
    /<th\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs
  );

const defaultExtractDhbData = (rawHtml: string): DhbVaccineDoseData[] =>
  extractDataFromHtml(
    rawHtml,
    /\<a id=\"90pct all ethnicities" name="90pct all ethnicities\"\>\<\/a\>.*?\<\/h4\>.*?\<tbody\>(.*?)\<\/tbody\>/gs,
    /nowrap\"\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<firstDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs
  );

const extractDataFromHtml = (
  rawHtml: string,
  vaccinationTo90PerDhbTableRegex: RegExp,
  perDhbRegex: RegExp
): DhbVaccineDoseData[] => {
  const vaccinationTo90PerDhbTableHtml =
    vaccinationTo90PerDhbTableRegex.exec(rawHtml)![1];

  const vaccinationDataPerDhb: DhbVaccineDoseData[] = [];
  let match;
  while ((match = perDhbRegex.exec(vaccinationTo90PerDhbTableHtml)) !== null) {
    const dhbDoseData = createPopulationDoseDataForDhbFromRegexMatch(match);
    vaccinationDataPerDhb.push(dhbDoseData);

    if (dhbDoseData.dhbName.includes("Overseas / Unknown")) {
      // this means we have reached the bottom of the table and all DHBs have been parsed
      break;
    }
  }
  return vaccinationDataPerDhb;
};

const createPopulationDoseDataForDhbFromRegexMatch = (
  match: RegExpExecArray
): DhbVaccineDoseData => {
  const firstDoses = convertToNumber(match.groups!.firstDoses);
  const secondDoses = convertToNumber(match.groups!.secondDoses);
  const totalPopulation = convertToNumber(match.groups!.totalPopulation);

  const firstDosesTo90Percent =
    match.groups!.firstDosesToReach90Percent == null
      ? calculateDosesToReach90Percent(firstDoses, totalPopulation)
      : convertToNumber(match.groups!.firstDosesToReach90Percent);

  const secondDosesTo90Percent =
    match.groups!.secondDosesToReach90Percent == null
      ? calculateDosesToReach90Percent(secondDoses, totalPopulation)
      : convertToNumber(match.groups!.secondDosesToReach90Percent);

  return {
    dhbName: match.groups!.DhbName as DhbName,
    firstDoses: firstDoses,
    firstDosesPercentageRaw: match.groups!.firstDosesPercentage,
    firstDosesTo90Percent: firstDosesTo90Percent,
    secondDoses: secondDoses,
    secondDosesPercentageRaw: match.groups!.secondDosesPercentage,
    secondDosesTo90Percent: secondDosesTo90Percent,
    totalPopulation: totalPopulation,
  };
};

const calculateDosesToReach90Percent = (
  currentDoses: number,
  totalPopulation: number
): number => Math.max(Math.round(totalPopulation * 0.9) - currentDoses, 0);
