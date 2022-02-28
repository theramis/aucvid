import {
  DhbName,
  DhbVaccineDoseData,
} from "../../../shared/types/VaccineDataTypes";
import { convertToNumber } from "../../utilities";

export const extractDhbData_Including_and_Before_16_02_22 = (
  rawHtml: string
): DhbVaccineDoseData[] => {
  const vaccinationTo90PerDhbTableHtml =
    /\<a id=\"dhbtables all ethnicities" name="dhbtables all ethnicities\"\>\<\/a\>.*?\<\/h4\>.*?\<tbody\>(.*?)\<\/tbody\>/gs.exec(
      rawHtml
    )![1];

  const perDhbRegex =
    /<th\>(?<DhbName>.*?)\<\/th\>.*?\>(?<firstDoses>.*?)\<\/td\>.*?\>(?<firstDosesPercentage>.*?)\<\/td\>.*?\>(?<secondDoses>.*?)\<\/td\>.*?\>(?<secondDosesPercentage>.*?)\<\/td\>.*?\>(?<totalPopulation>.*?)\<\/td\>/gs;
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

  const firstDosesTo90Percent = calculateDosesToReach90Percent(
    firstDoses,
    totalPopulation
  );

  const secondDosesTo90Percent = calculateDosesToReach90Percent(
    secondDoses,
    totalPopulation
  );

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
