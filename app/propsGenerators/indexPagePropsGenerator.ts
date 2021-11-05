import { DateTime } from "luxon";
import { getVaccineData } from "../../shared/dataRepository";
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

function calculateDosePercentage(
  dosesCount: number,
  totalPopulation: number
): number {
  return parseFloat(((dosesCount / totalPopulation) * 100).toFixed(6));
}

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

    const firstDosesPercentage = calculateDosePercentage(
      dhb.firstDoses,
      dhb.totalPopulation
    );

    const secondDosesPercentage = calculateDosePercentage(
      dhb.secondDoses,
      dhb.totalPopulation
    );

    return {
      ...dhb,
      regionIds: regions,
      firstDosesPercentage,
      secondDosesPercentage,
      hasMetFirstDoseTarget:
        firstDosesPercentage >= CONSTANTS.firstDoseTargetPercentage,
      hasMetSecondDoseTarget:
        secondDosesPercentage >= CONSTANTS.secondDoseTargetPercentage,
      firstDosesChange: yesterdayDoseData
        ? dhb.firstDosesTo90Percent - yesterdayDoseData?.firstDosesTo90Percent
        : 0,
      secondDosesChange: yesterdayDoseData
        ? dhb.secondDosesTo90Percent - yesterdayDoseData?.secondDosesTo90Percent
        : 0,
    };
  });
}
