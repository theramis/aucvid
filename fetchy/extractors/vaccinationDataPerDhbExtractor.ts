import { DateTime } from "luxon";
import { DhbVaccineDoseData } from "../../shared/types/VaccineDataTypes";
import { extractDhbDataIncludingAndBefore15Feb22 } from "./vaccinationDataPerDhbExtractors/extractorIncludingAndBefore15Feb22";
import { extractDhbDataIncludingAndBefore16Feb22 } from "./vaccinationDataPerDhbExtractors/extractorIncludingAndBefore16Feb22";
import { extractDhbDataCurrent } from "./vaccinationDataPerDhbExtractors/extractorCurrent";

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
    return extractDhbDataIncludingAndBefore15Feb22(rawHtml);
  }

  if (rawHtmlDate <= new Date(2022, 2, 16)) {
    return extractDhbDataIncludingAndBefore16Feb22(rawHtml);
  }

  return extractDhbDataCurrent(rawHtml);
};
