import { DateTime } from "luxon";
import { getAllVaccineData } from "../../shared/vaccineDataStore";
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
  const [latestData, yesterdayData] = await getAllVaccineData(2);

  return {
    allDhbsVaccineDoseData: generateAllDhbsVaccineDoseData(
      latestData.data.vaccinationsPerDhb,
      yesterdayData.data.vaccinationsPerDhb
    ),
    dataValidAsAtTimeUtc: DateTime.fromISO(
      latestData.data.dataValidAsAtNzTimeIso
    )
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
        ? yesterdayDoseData?.firstDosesTo90Percent - dhb.firstDosesTo90Percent
        : null,
      secondDosesChange: yesterdayDoseData
        ? yesterdayDoseData?.secondDosesTo90Percent - dhb.secondDosesTo90Percent
        : null,
    };
  });
}
