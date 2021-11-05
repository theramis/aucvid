import { DateTime } from "luxon";
import { getLatestVaccineData } from "../../shared/dataRepository";
import {
  DhbVaccineDoseData,
  DhbName,
} from "../../shared/types/VaccineDataTypes";
import { CONSTANTS } from "../constants";
import {
  DhbRegionId,
  DhbVaccineDoseDataForIndexPage,
  IndexPageProps,
} from "../types/IndexPageProps";

export default async function fetchIndexPageProps(): Promise<IndexPageProps> {
  const data = await getLatestVaccineData();

  return {
    allDhbsVaccineDoseData: generateAllDhbsVaccineDoseData(
      data.vaccinationsPerDhb
    ),
    dataValidAsAtTimeUtc: DateTime.fromISO(data.dataValidAsAtNzTimeIso)
      .toUTC()
      .toISO(),
  };
}

function generateAllDhbsVaccineDoseData(
  dhbVaccineData: DhbVaccineDoseData[]
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

  return dhbVaccineData.map((dhb) => {
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
    return {
      ...dhb,
      regionIds: regions,
      hasMetFirstDoseTarget: dhb.firstDosesTo90Percent === 0,
      hasMetSecondDoseTarget: dhb.secondDosesTo90Percent === 0,
    };
  });
}
