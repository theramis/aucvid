import {
  DhbName,
  DhbVaccineDoseData,
} from "../../shared/types/VaccineDataTypes";
import { convertToNumber } from "../utilities";

export const getVaccinationDataPerDhb = (
  rawHtml: string
): DhbVaccineDoseData[] => {
  const vaccinationTo90PerDhbTableHtml =
    /\<a id=\"dhbtables all ethnicities" name="dhbtables all ethnicities\"\>\<\/a\>.*?\<\/h4\>.*?\<tbody\>(.*?)\<\/tbody\>/gs.exec(
      rawHtml
    )![1];

  const perDhbRegex =
    /<th\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<firstDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs;

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
  return {
    dhbName: match.groups!.DhbName as DhbName,
    firstDoses: convertToNumber(match.groups!.firstDoses),
    firstDosesPercentageRaw: match.groups!.firstDosesPercentage,
    firstDosesTo90Percent: convertToNumber(
      match.groups!.firstDosesToReach90Percent
    ),
    secondDoses: convertToNumber(match.groups!.secondDoses),
    secondDosesPercentageRaw: match.groups!.secondDosesPercentage,
    secondDosesTo90Percent: convertToNumber(
      match.groups!.secondDosesToReach90Percent
    ),
    totalPopulation: convertToNumber(match.groups!.totalPopulation),
  };
};
