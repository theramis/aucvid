import { NzTimeIso, DataPeriod, VaccineData } from "./types/VaccineDataTypes";
import { promises as fs, existsSync as fileExists } from "fs";
import { DateTime } from "luxon";
import { CONSTANTS } from "./constants";

export const createOrUpdateVaccineDataForDate = async (
  time: NzTimeIso,
  data: VaccineData
) => await fs.writeFile(generateFilePath(time), JSON.stringify(data, null, 2));

export const getVaccineData = async (
  period: DataPeriod
): Promise<VaccineData> => {
  const dataFile = await getVaccineDataFilePath(period);
  const data = await fs.readFile(dataFile, "utf8");
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

const getVaccineDataFilePath = async (period: DataPeriod) => {
  const files = await fs.readdir(CONSTANTS.dataFolder);
  const [latestPath, yesterdayPath] = files.sort().reverse();
  const filePath = period === "latest" ? latestPath : yesterdayPath;

  return `${CONSTANTS.dataFolder}/${filePath}`;
};
