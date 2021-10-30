import got from "got";
import { VaccineData } from "../shared/types/VaccineDataTypes";
import { getVaccinationDataPerDhb } from "./extractors/vaccinationDataPerDhbExtrator";
import { extractDailyUpdatedNzTime } from "./extractors/dailyUpdatedTimeExtractor";
import { CONSTANTS } from "../shared/constants";

export default async function getVaccineData(): Promise<VaccineData> {
  const response = await got(CONSTANTS.mohVaccineDataSiteUrl);
  const rawHtml = response.body;

  return {
    vaccinationsPerDhb: getVaccinationDataPerDhb(rawHtml),
    dataValidAsAtNzTimeIso: extractDailyUpdatedNzTime(rawHtml).toISO(),
  };
}
