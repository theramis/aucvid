import { DateTime } from "luxon";

const getHoursAgo = (text: string) => {
  const hoursBeforeNow = DateTime.fromISO(text).diffNow("hours").get("hours");

  return Math.floor(Math.abs(hoursBeforeNow));
};

const hoursBeforeNow = (text: string) => {
  const hoursAgo = getHoursAgo(text);

  if (hoursAgo === 0) {
    return "less than an hour ago";
  }

  if (hoursAgo === 1) {
    return "1 hour ago";
  }

  return `${hoursAgo} hours ago`;
};

export default hoursBeforeNow;
