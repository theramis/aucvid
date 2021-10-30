import getVaccineData from "./vaccineDataService";
import {
  createDataForDate,
  getDataForDate,
  updateDataIfDifferentForDate,
} from "../shared/dataRepository";

const main = async () => {
  const vaccineData = await getVaccineData();

  const existingData = await getDataForDate(vaccineData.dataValidAsAtNzTimeIso);
  if (existingData == null) {
    await createDataForDate(vaccineData.dataValidAsAtNzTimeIso, vaccineData);
  } else {
    await updateDataIfDifferentForDate(
      vaccineData.dataValidAsAtNzTimeIso,
      vaccineData
    );
  }
};

main();
