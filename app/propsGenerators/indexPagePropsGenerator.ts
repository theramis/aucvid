import { DateTime } from "luxon";
import { getVaccineData } from "../../shared/dataRepository";
import {
  DhbVaccineDoseData,
  DhbName,
} from "../../shared/types/VaccineDataTypes";
import {
  DhbRegionId,
  DhbVaccineDoseDataForIndexPage,
  IndexPageProps,
} from "../types/IndexPageProps";

export default async function fetchIndexPageProps(): Promise<IndexPageProps> {
  const latestData = await getVaccineData("latest");
  const yesterdayData = await getVaccineData("yesterday");

  return {
    allDhbsVaccineDoseData: generateAllDhbsVaccineDoseData(
      latestData.vaccinationsPerDhb,
      yesterdayData.vaccinationsPerDhb
    ),
    dataValidAsAtTimeUtc: DateTime.fromISO(latestData.dataValidAsAtNzTimeIso)
      .toUTC()
      .toISO(),
  };
}

function generateAllDhbsVaccineDoseData(
  latestVaccineData: DhbVaccineDoseData[],
  yesterdayVaccineData: DhbVaccineDoseData[]
): DhbVaccineDoseDataForIndexPage[] {
  const aucklandDhbNames: DhbName[] = [
    "Waitemata",
    "Auckland",
    "Counties Manukau",
  ];
  const northIslandDhbNames: DhbName[] = aucklandDhbNames.concat([
    "Northland",
    "Waikato",
    "Lakes",
    "Bay of Plenty",
    "Tairawhiti",
    "Taranaki",
    "Hawkes Bay",
    "MidCentral",
    "Whanganui",
    "Capital and Coast",
    "Hutt Valley",
    "Wairarapa",
  ]);
  const southIslandDhbNames: DhbName[] = [
    "Nelson Marlborough",
    "West Coast",
    "Canterbury",
    "South Canterbury",
    "Southern",
  ];

  return latestVaccineData.map((dhb) => {
    const regions: DhbRegionId[] = [];
    if (aucklandDhbNames.includes(dhb.dhbName)) {
      regions.push("auckland");
    }
    if (northIslandDhbNames.includes(dhb.dhbName)) {
      regions.push("northIsland");
    }
    if (southIslandDhbNames.includes(dhb.dhbName)) {
      regions.push("southIsland");
    }

    const yesterdayDoseData = yesterdayVaccineData.find(
      (yesterdayDhb) => yesterdayDhb.dhbName === dhb.dhbName
    );

    return {
      ...dhb,
      regionIds: regions,
      hasMetFirstDoseTarget: dhb.firstDosesTo90Percent === 0,
      hasMetSecondDoseTarget: dhb.secondDosesTo90Percent === 0,
      firstDosesChange: yesterdayDoseData
        ? dhb.firstDosesTo90Percent - yesterdayDoseData?.firstDosesTo90Percent
        : 0,
      secondDosesChange: yesterdayDoseData
        ? dhb.secondDosesTo90Percent - yesterdayDoseData?.secondDosesTo90Percent
        : 0,
    };
  });
}
