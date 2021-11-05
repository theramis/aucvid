import getVaccineData from "./vaccineDataService";
import {
  createOrUpdateVaccineDataForDate,
  getVaccineDataForDate,
} from "../shared/dataRepository";
import got from "got";
import { diff } from "deep-object-diff";

const sendNotification = async (message: string) => {
  if (process.env.SEND_DISCORD_NOTIFICATIONS === "true") {
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

    if (
      existingData == null ||
      areObjectsDifferent(existingData, vaccineData)
    ) {
      await createOrUpdateVaccineDataForDate(
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
