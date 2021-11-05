import { NzTimeIso, VaccineData } from "./types/VaccineDataTypes";
import { promises as fs, existsSync as fileExists } from "fs";
import { DateTime } from "luxon";
import { CONSTANTS } from "./constants";

export const createOrUpdateVaccineDataForDate = async (
  time: NzTimeIso,
  data: VaccineData
) => await fs.writeFile(generateFilePath(time), JSON.stringify(data, null, 2));

export const getLatestVaccineData = async (): Promise<VaccineData> => {
  const latestDataFile = await getLatestVaccineDataFilePath();
  const data = await fs.readFile(latestDataFile, "utf8");
  return JSON.parse(data);
};

export const getVaccineDataForDate = async (
  time: NzTimeIso
): Promise<VaccineData | null> => {
  const filePath = generateFilePath(time);
  if (fileExists(filePath)) {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  }
  return null;
};

const generateFilePath = (time: NzTimeIso) => {
  const date = DateTime.fromISO(time).toFormat("yyyy-LL-dd");
  return `${CONSTANTS.dataFolder}/${date}.txt`;
};

const getLatestVaccineDataFilePath = async () => {
  const files = await fs.readdir(CONSTANTS.dataFolder);
  const latestDataFile = files.sort()[files.length - 1];
  return `${CONSTANTS.dataFolder}/${latestDataFile}`;
};
