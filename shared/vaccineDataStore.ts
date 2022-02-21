import { NzTimeIso, VaccineData } from "./types/VaccineDataTypes";
import { promises as fs, existsSync as fileExists } from "fs";
import { DateTime } from "luxon";
import { CONSTANTS } from "./constants";
import { DataDocument } from "./types/DataStoreTypes";

export const createOrUpdateVaccineDataForDate = async (
  time: NzTimeIso,
  vaccineData: VaccineData
) => {
  const filePath = generateVaccineDataFilePath(time);
  const previousFileData = fileExists(filePath)
    ? await readFileDataForPath(filePath)
    : null;

  const rightNow = DateTime.utc().toISO();
  const metadata = {
    createdAtUtcTimeIso: previousFileData
      ? previousFileData.metadata.createdAtUtcTimeIso
      : rightNow,
    updatedAtUtcTimeIso: rightNow,
  };

  await writeFileDataForPath(filePath, { metadata, data: vaccineData });
};

export const getAllVaccineData = async (
  // by default return all data
  maxItems: number = 999
): Promise<DataDocument<VaccineData>[]> => {
  const files = await fs.readdir(CONSTANTS.vaccineDataFolder);
  const filesToParse = files.sort().reverse().slice(0, maxItems);

  return Promise.all(
    filesToParse.map((f) => {
      const filePath = `${CONSTANTS.vaccineDataFolder}/${f}`;
      return readFileDataForPath(filePath);
    })
  );
};

export const getVaccineDataForDate = async (
  time: NzTimeIso
): Promise<DataDocument<VaccineData> | null> => {
  const filePath = generateVaccineDataFilePath(time);
  return fileExists(filePath) ? await readFileDataForPath(filePath) : null;
};

export const deleteAllVaccineData = async () => {
  const files = await fs.readdir(CONSTANTS.vaccineDataFolder);
  await Promise.all(
    files.map((f) => {
      const filePath = `${CONSTANTS.vaccineDataFolder}/${f}`;
      return fs.rm(filePath);
    })
  );
};

export const getAllRawVaccineSites = async () => {
  const files = await fs.readdir(CONSTANTS.rawSiteFolder);

  return Promise.all(
    files.map((f) => {
      const filePath = `${CONSTANTS.rawSiteFolder}/${f}`;
      return fs.readFile(filePath, "utf8");
    })
  );
};

export const storeRawVaccineSite = async (time: NzTimeIso, rawHtml: string) =>
  await fs.writeFile(generateRawSiteFilePath(time), rawHtml);

const writeFileDataForPath = (
  filePath: string,
  fileData: DataDocument<VaccineData>
) => fs.writeFile(filePath, JSON.stringify(fileData, null, 2));

const readFileDataForPath = async (
  filePath: string
): Promise<DataDocument<VaccineData>> => {
  const fileData = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileData);
};

const formatDate = (time: NzTimeIso) =>
  DateTime.fromISO(time).toFormat("yyyy-LL-dd");

const generateVaccineDataFilePath = (time: NzTimeIso) =>
  `${CONSTANTS.vaccineDataFolder}/${formatDate(time)}.json`;

const generateRawSiteFilePath = (time: NzTimeIso) =>
  `${CONSTANTS.rawSiteFolder}/${formatDate(time)}.html`;
