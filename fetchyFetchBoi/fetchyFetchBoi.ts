import getVaccineData from "./vaccineDataService";
import {
  createDataForDate,
  getDataForDate,
  updateDataIfDifferentForDate,
} from "../shared/dataRepository";
import got from "got";

const main = async () => {
  try {
    const vaccineData = await getVaccineData();

    const existingData = await getDataForDate(
      vaccineData.dataValidAsAtNzTimeIso
    );
    if (existingData == null) {
      await createDataForDate(vaccineData.dataValidAsAtNzTimeIso, vaccineData);
    } else {
      await updateDataIfDifferentForDate(
        vaccineData.dataValidAsAtNzTimeIso,
        vaccineData
      );
    }
  } catch (error) {
    console.error(error);
    await got.post(process.env.DISCORD_WEBHOOK, {
      json: {
        avatar_url:
          "https://i1.sndcdn.com/artworks-000497194077-gnjnca-t500x500.jpg",
        content:
          ":warning: :warning: **Fetchy ain't fetching!** :warning::warning:",
        username: "Fetchy",
      },
    });
  }
};

main();
