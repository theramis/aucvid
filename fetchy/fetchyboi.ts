import {
  createOrUpdateVaccineDataForDate,
  deleteAllVaccineData,
  getAllRawVaccineSites,
  getVaccineDataForDate,
  storeRawVaccineSite,
} from "../shared/vaccineDataStore";
import got from "got";
import { diff } from "deep-object-diff";
import { CONSTANTS } from "../shared/constants";
import extractVaccineData from "./vaccineDataExtractor";

const sendNotification = async (message: string) => {
  if (process.env.SEND_DISCORD_NOTIFICATIONS === "true") {
    await got.post(process.env.DISCORD_WEBHOOK!, {
      json: {
        avatar_url:
          "https://i1.sndcdn.com/artworks-000497194077-gnjnca-t500x500.jpg",
        content: message,
        username: "Fetchy",
      },
    });
  } else {
    console.log(message);
  }
};

const sendDataUpdatedNotification = async () => {
  await sendNotification(
    ":raised_hands: :raised_hands: **Fetchy got some new data** :raised_hands: :raised_hands:"
  );
};

const areObjectsDifferent = (a: Object, b: Object) =>
  Boolean(Object.keys(diff(a, b)).length);

const extractAndStoreVaccineData = async (rawHtml: string) => {
  // extract vaccine data
  const vaccineData = extractVaccineData(rawHtml);

  // get local vaccine data
  const existingData = await getVaccineDataForDate(
    vaccineData.dataValidAsAtNzTimeIso
  );

  if (
    existingData == null ||
    areObjectsDifferent(existingData.data, vaccineData)
  ) {
    // store raw html and data
    await storeRawVaccineSite(vaccineData.dataValidAsAtNzTimeIso, rawHtml);
    await createOrUpdateVaccineDataForDate(
      vaccineData.dataValidAsAtNzTimeIso,
      vaccineData
    );
    await sendDataUpdatedNotification();
  }
};

const regenVaccineData = async () => {
  try {
    await deleteAllVaccineData();

    const allRawSiteHtml = await getAllRawVaccineSites();
    await Promise.all(allRawSiteHtml.map((s) => extractAndStoreVaccineData(s)));
  } catch (error) {
    console.error(error);
  }
};

const fetchNewVaccineData = async () => {
  try {
    // get latest html from MoH site
    const rawHtml = (await got(CONSTANTS.mohVaccineDataSiteUrl)).body;

    await extractAndStoreVaccineData(rawHtml);
  } catch (error) {
    console.error(error);
    await sendNotification(
      ":warning: :warning: **Fetchy ain't fetching!** :warning::warning:"
    );
  }
};

const main = async () => {
  if (process.env.REGEN_DATA === "true") {
    await regenVaccineData();
  } else {
    await fetchNewVaccineData();
  }
};

main();
