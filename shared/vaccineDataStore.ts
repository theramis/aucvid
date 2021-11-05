import { NzTimeIso, VaccineData } from "./types/VaccineDataTypes";
import { promises as fs, existsSync as fileExists } from "fs";
import { DateTime } from "luxon";
import { CONSTANTS } from "./constants";

export const createOrUpdateVaccineDataForDate = async (
  time: NzTimeIso,
  vaccineData: VaccineData
) =>
  await fs.writeFile(
    generateVaccineDataFilePath(time),
    JSON.stringify(vaccineData, null, 2)
  );

export const getVaccineDataForDate = async (
  time: NzTimeIso
): Promise<VaccineData | null> => {
  const filePath = generateVaccineDataFilePath(time);
  if (fileExists(filePath)) {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  }
  return null;
};

export const getAllVaccineData = async (
  // by default return all data
  maxItems: number = 999
): Promise<VaccineData[]> => {
  const files = await fs.readdir(CONSTANTS.vaccineDataFolder);
  const filesToParse = files.sort().reverse().slice(0, maxItems);

  const vaccineData = filesToParse.map(async (f) => {
    const filePath = `${CONSTANTS.vaccineDataFolder}/${f}`;
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  });

  return Promise.all(vaccineData);
};

export const storeRawVaccineSite = async (time: NzTimeIso, rawHtml: string) =>
  await fs.writeFile(generateRawSiteFilePath(time), rawHtml);

const formatDate = (time: NzTimeIso) =>
  DateTime.fromISO(time).toFormat("yyyy-LL-dd");

const generateVaccineDataFilePath = (time: NzTimeIso) =>
  `${CONSTANTS.vaccineDataFolder}/${formatDate(time)}.json`;

const generateRawSiteFilePath = (time: NzTimeIso) =>
  `${CONSTANTS.rawSiteFolder}/${formatDate(time)}.html`;
