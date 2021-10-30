import { NzTimeIso, VaccineData } from "./types/VaccineDataTypes";
import { promises as fs, existsSync as fileExists } from "fs";
import { DateTime } from "luxon";
import { CONSTANTS } from "./constants";
import { diff } from "deep-object-diff";

export const createDataForDate = async (time: NzTimeIso, data: VaccineData) =>
  await fs.writeFile(generateFilePath(time), JSON.stringify(data, null, 2));

export const getDataForDate = async (
  time: NzTimeIso
): Promise<VaccineData | null> => {
  const filePath = generateFilePath(time);
  if (fileExists(filePath)) {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  }
  return null;
};

export const updateDataIfDifferentForDate = async (
  time: NzTimeIso,
  data: VaccineData
) => {
  const existingData = await getDataForDate(time);
  if (existingData == null) {
    return;
  }

  if (areObjectsDifferent(existingData, data)) {
    await createDataForDate(time, data);
  }
};

const areObjectsDifferent = (a: object, b: object) =>
  Object.keys(diff(a, b)).length !== 0;

const generateFilePath = (time: NzTimeIso) => {
  const date = DateTime.fromISO(time).toFormat("yyyy-LL-dd");
  return `${CONSTANTS.dataFolder}/${date}.txt`;
};
