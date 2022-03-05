import extractVaccineData from "./vaccineDataExtractor";
import { getAllRawVaccineSites } from "../shared/vaccineDataStore";

test("Extracts vaccine data per dhb from all html files", async () => {
  for (const rawHtml of await getAllRawVaccineSites()) {
    const vaccineData = extractVaccineData(rawHtml);
    expect(vaccineData.vaccinationsPerDhb).toHaveLength(21);

    for (const dhbData of vaccineData.vaccinationsPerDhb) {
      expect(dhbData.firstDosesTo90Percent).toBeGreaterThanOrEqual(0);
      expect(dhbData.secondDosesTo90Percent).toBeGreaterThanOrEqual(0);
    }
  }
});
