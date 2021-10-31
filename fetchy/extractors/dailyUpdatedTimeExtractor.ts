import { DateTime } from "luxon";
import { convertToNumber } from "../utilities";

export const extractDailyUpdatedNzTime = (rawHtml: string): DateTime => {
  // extracts a date like "11:59pm 24 October 2021"
  const match =
    /Data\sin\sthis\ssection\sis\sas\sat\s([0-9]+):([0-9]+)(am|pm)\s([0-9]+)\s(.*?)\s([0-9]+)\sand\sis\supdated\sdaily/g.exec(
      rawHtml
    )!;

  const hour = convertToNumber(match[1]);
  const minute = convertToNumber(match[2]);
  const isPm = match[3] === "pm";
  const date = convertToNumber(match[4]);
  const month = getMonthFromString(match[5]);
  const year = convertToNumber(match[6]);

  return DateTime.fromObject(
    {
      day: date,
      year: year,
      month: month,
      hour: isPm ? hour + 12 : hour,
      minute: minute,
    },
    { zone: "Pacific/Auckland" }
  );
};

const getMonthFromString = (s: string) =>
  new Date(Date.parse(`${s} 1, 2012`)).getMonth() + 1;
