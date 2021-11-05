import { VaccineData } from "../shared/types/VaccineDataTypes";
import { getVaccinationDataPerDhb } from "./extractors/vaccinationDataPerDhbExtrator";
import { extractDailyUpdatedNzTime } from "./extractors/dailyUpdatedTimeExtractor";

export default function extractVaccineData(rawHtml: string): VaccineData {
  return {
    vaccinationsPerDhb: getVaccinationDataPerDhb(rawHtml),
    dataValidAsAtNzTimeIso: extractDailyUpdatedNzTime(rawHtml).toISO(),
  };
}
