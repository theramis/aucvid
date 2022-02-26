import { DateTime } from "luxon";
import { getAllVaccineData } from "../../shared/vaccineDataStore";
import { getLatestFetchyRun } from "../../shared/githubDataStore";
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
import { createCache } from "../../shared/cache";

function calculateDosePercentage(
  dosesCount: number,
  totalPopulation: number
): number {
  return parseFloat(((dosesCount / totalPopulation) * 100).toFixed(6));
}

const getCachedLatestFetchyRun = createCache(getLatestFetchyRun, {
  key: "latest-fetchy-run",
  ttlInSeconds: 5 * 60,
});

export default async function fetchIndexPageProps(): Promise<IndexPageProps> {
  const [
    { data: latestData, metadata: latestMetaData },
    { data: yesterdayData },
  ] = await getAllVaccineData(2);
  const { value: latestFetchyRun } = await getCachedLatestFetchyRun();

  return {
    lastCheckedAtTimeUtc: latestMetaData.updatedAtUtcTimeIso, // Temporary fix while regex is re-written //latestFetchyRun?.run_started_at ?? null,
    dataUpdatedAtTimeUtc: latestMetaData.updatedAtUtcTimeIso,
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

    const yesterdaysFirstDosesPercentage = yesterdayDoseData
      ? calculateDosePercentage(
          yesterdayDoseData.firstDoses,
          yesterdayDoseData.totalPopulation
        )
      : null;

    const yesterdaysSecondDosesPercentage = yesterdayDoseData
      ? calculateDosePercentage(
          yesterdayDoseData.secondDoses,
          yesterdayDoseData.totalPopulation
        )
      : null;

    return {
      ...dhb,
      regionIds: regions,
      firstDosesPercentage,
      secondDosesPercentage,
      hasMetFirstDoseTarget:
        firstDosesPercentage >= CONSTANTS.firstDoseTargetPercentage,
      hasMetSecondDoseTarget:
        secondDosesPercentage >= CONSTANTS.secondDoseTargetPercentage,
      firstDosesPercentChange: yesterdaysFirstDosesPercentage
        ? firstDosesPercentage - yesterdaysFirstDosesPercentage
        : null,
      secondDosesPercentChange: yesterdaysSecondDosesPercentage
        ? secondDosesPercentage - yesterdaysSecondDosesPercentage
        : null,
    };
  });
}
