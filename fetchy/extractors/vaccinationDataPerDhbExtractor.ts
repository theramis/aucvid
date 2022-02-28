import { DateTime } from "luxon";
import { DhbVaccineDoseData } from "../../shared/types/VaccineDataTypes";
import { extractDhbData_Including_and_Before_15_02_22 } from "./vaccinationDataPerDhbExtractors/extractorIncludingAndBefore15_02_22";
import { extractDhbData_Including_and_Before_16_02_22 } from "./vaccinationDataPerDhbExtractors/extractorIncludingAndBefore16_02_22";
import { extractDhbData_Including_and_After_17_02_22 } from "./vaccinationDataPerDhbExtractors/extractorIncludingAndAfter17_02_22";

export const getVaccinationDataPerDhb = (
  dailyUpdatedNzTimeFromHtml: DateTime,
  rawHtml: string
): DhbVaccineDoseData[] => {
  // Making this to avoid timezone issues when comparing dates below
  const rawHtmlDate = new Date(
    dailyUpdatedNzTimeFromHtml.year,
    dailyUpdatedNzTimeFromHtml.month,
    dailyUpdatedNzTimeFromHtml.day
  );

  if (rawHtmlDate <= new Date(2022, 2, 15)) {
    return extractDhbData_Including_and_Before_15_02_22(rawHtml);
  }

  if (rawHtmlDate <= new Date(2022, 2, 16)) {
    return extractDhbData_Including_and_Before_16_02_22(rawHtml);
  }

  return extractDhbData_Including_and_After_17_02_22(rawHtml);
};
