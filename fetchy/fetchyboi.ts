import getVaccineData from "./vaccineDataService";
import {
  createVaccineDataForDate,
  getVaccineDataForDate,
  updateVaccineDataForDate,
} from "../shared/dataRepository";
import got from "got";
import { diff } from "deep-object-diff";

const sendNotification = async (message: string) => {
  // don't send notifications if running in a PR
  if (process.env.GITHUB_EVENT_NAME === "pull_request") {
    return;
  }

  await got.post(process.env.DISCORD_WEBHOOK!, {
    json: {
      avatar_url:
        "https://i1.sndcdn.com/artworks-000497194077-gnjnca-t500x500.jpg",
      content: message,
      username: "Fetchy",
    },
  });
};

const sendDataUpdatedNotification = async () => {
  await sendNotification(
    ":raised_hands: :raised_hands: **Fetchy got some new data** :raised_hands: :raised_hands:"
  );
};

const areObjectsDifferent = (a: object, b: object) =>
  Object.keys(diff(a, b)).length !== 0;

const main = async () => {
  try {
    const vaccineData = await getVaccineData();
    const existingData = await getVaccineDataForDate(
      vaccineData.dataValidAsAtNzTimeIso
    );

    if (existingData == null) {
      await createVaccineDataForDate(
        vaccineData.dataValidAsAtNzTimeIso,
        vaccineData
      );
      await sendDataUpdatedNotification();
    } else if (areObjectsDifferent(existingData, vaccineData)) {
      await updateVaccineDataForDate(
        vaccineData.dataValidAsAtNzTimeIso,
        vaccineData
      );
      await sendDataUpdatedNotification();
    }
  } catch (error) {
    console.error(error);

    await sendNotification(
      ":warning: :warning: **Fetchy ain't fetching!** :warning::warning:"
    );
  }
};

main();
