import { VaccineData } from "../shared/types/VaccineDataTypes";
import { getVaccinationDataPerDhb } from "./extractors/vaccinationDataPerDhbExtractor";
import { extractDailyUpdatedNzTime } from "./extractors/dailyUpdatedTimeExtractor";

export default function extractVaccineData(rawHtml: string): VaccineData {
  const dailyUpdatedNzTime = extractDailyUpdatedNzTime(rawHtml);
  return {
    vaccinationsPerDhb: getVaccinationDataPerDhb(dailyUpdatedNzTime, rawHtml),
    dataValidAsAtNzTimeIso: dailyUpdatedNzTime.toISO(),
  };
}
