import {
  DhbName,
  DhbVaccineDoseData,
} from "../../shared/types/VaccineDataTypes";
import { convertToNumber } from "../utilities";

export const getVaccinationDataPerDhb = (
  rawHtml: string
): DhbVaccineDoseData[] => {
  const vaccinationTo90PerDhbTableHtml =
    /Vaccinations\sto\s90%\sby\sDHB\<\/h3\>.*?\<tbody\>(.*?)\<\/tbody\>/gs.exec(
      rawHtml
    )![1];

  const perDhbRegex =
    /nowrap\"\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<firstDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDosesToReach90Percent>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs;

  const vaccinationDataPerDhb: DhbVaccineDoseData[] = [];
  let match;
  while ((match = perDhbRegex.exec(vaccinationTo90PerDhbTableHtml)) !== null) {
    const dhbDoseData = createPopulationDoseDataForDhbFromRegexMatch(match);

    if (dhbDoseData.dhbName.includes("New Zealand")) {
      // this means we have reached the bottom of the table and all DHBs have been parsed
      break;
    }

    vaccinationDataPerDhb.push(dhbDoseData);
  }
  return vaccinationDataPerDhb;
};

const createPopulationDoseDataForDhbFromRegexMatch = (
  match: RegExpExecArray
): DhbVaccineDoseData => {
  return {
    dhbName: match.groups!.DhbName as DhbName,
    firstDoses: convertToNumber(match.groups!.firstDoses),
    firstDosesPercentage:
      convertToNumber(match.groups!.firstDosesPercentage) / 100,
    firstDosesTo90Percent: convertToNumber(
      match.groups!.firstDosesToReach90Percent
    ),
    secondDoses: convertToNumber(match.groups!.secondDoses),
    secondDosesPercentage:
      convertToNumber(match.groups!.secondDosesPercentage) / 100,
    secondDosesTo90Percent: convertToNumber(
      match.groups!.secondDosesToReach90Percent
    ),
    totalPopulation: convertToNumber(match.groups!.totalPopulation),
  };
};
