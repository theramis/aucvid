import {
  NzTimeIso,
  VaccineData,
  VaccineDataFile,
} from "./types/VaccineDataTypes";
import { promises as fs, existsSync as fileExists } from "fs";
import { DateTime } from "luxon";
import { CONSTANTS } from "./constants";

export const createOrUpdateVaccineDataForDate = async (
  time: NzTimeIso,
  vaccineData: VaccineData
) => {
  const filePath = generateVaccineDataFilePath(time);
  const previousFileData = await getFileDataForPath(filePath);

  const rightNow = DateTime.fromISO(DateTime.now().toISO(), {
    zone: "Pacific/Auckland",
  }).toISO();

  if (previousFileData) {
    const { createdAtTimeIso } = previousFileData.meta;
    const meta = {
      createdAtTimeIso,
      updatedAtTimeIso: rightNow,
    };

    return writeFileDataForPath(filePath, { meta, data: vaccineData });
  } else {
    const meta = {
      createdAtTimeIso: rightNow,
      updatedAtTimeIso: rightNow,
    };

    return writeFileDataForPath(filePath, { meta, data: vaccineData });
  }
};

export const getAllVaccineData = async (
  // by default return all data
  maxItems: number = 999
): Promise<VaccineDataFile[]> => {
  const files = await fs.readdir(CONSTANTS.vaccineDataFolder);
  const filesToParse = files.sort().reverse().slice(0, maxItems);

  const vaccineData = await Promise.all(
    filesToParse.map((f) => {
      const filePath = `${CONSTANTS.vaccineDataFolder}/${f}`;
      return getFileDataForPath(filePath);
    })
  );

  return vaccineData.filter((v): v is VaccineDataFile => v !== null);
};

export const getVaccineDataForDate = async (
  time: NzTimeIso
): Promise<VaccineDataFile | null> => {
  const filePath = generateVaccineDataFilePath(time);

  return getFileDataForPath(filePath);
};

const getFileDataForPath = async (
  filePath: string
): Promise<VaccineDataFile | null> => {
  if (fileExists(filePath)) {
    const fileData = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileData);
  }
  return null;
};

export const storeRawVaccineSite = async (time: NzTimeIso, rawHtml: string) =>
  await fs.writeFile(generateRawSiteFilePath(time), rawHtml);

const writeFileDataForPath = (filePath: string, fileData: VaccineDataFile) =>
  fs.writeFile(filePath, JSON.stringify(fileData, null, 2));

const formatDate = (time: NzTimeIso) =>
  DateTime.fromISO(time).toFormat("yyyy-LL-dd");

const generateVaccineDataFilePath = (time: NzTimeIso) =>
  `${CONSTANTS.vaccineDataFolder}/${formatDate(time)}.json`;

const generateRawSiteFilePath = (time: NzTimeIso) =>
  `${CONSTANTS.rawSiteFolder}/${formatDate(time)}.html`;
