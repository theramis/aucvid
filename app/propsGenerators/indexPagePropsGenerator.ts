import { DateTime } from "luxon";
import {
  getAllVaccineData,
  getVaccineDataForDate,
} from "../../shared/vaccineDataStore";
import { getLatestFetchyRun } from "../../shared/githubDataStore";
import {
  DhbVaccineDoseData,
  DhbName,
  NzTimeIso,
} from "../../shared/types/VaccineDataTypes";
import { CONSTANTS } from "../constants";
import {
  DhbRegionId,
  DhbVaccineDoseDataForIndexPage,
  IndexPageProps,
} from "../types/IndexPageProps";
import { createCache } from "../../shared/cache";

export type DatePageProps = Omit<IndexPageProps, "lastCheckedAtTimeUtc">;

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

export async function fetchDatePageProps(
  date: NzTimeIso
): Promise<DatePageProps | null> {
  const previousDateIso = DateTime.fromISO(date).minus({ days: 1 }).toISO();

  const dataForDate = await getVaccineDataForDate(date);
  const previousDataForDate = await getVaccineDataForDate(previousDateIso);

  if (!dataForDate || !previousDataForDate) {
    return null;
  }

  const { data, metadata } = dataForDate;
  const { data: previousData } = previousDataForDate;

  return {
    dataUpdatedAtTimeUtc: metadata.updatedAtUtcTimeIso,
    allDhbsVaccineDoseData: generateAllDhbsVaccineDoseData(
      data.vaccinationsPerDhb,
      previousData.vaccinationsPerDhb
    ),
    dataValidAsAtTimeUtc: DateTime.fromISO(data.dataValidAsAtNzTimeIso)
      .toUTC()
      .toISO(),
  };
}

export default async function fetchIndexPageProps(): Promise<IndexPageProps> {
  const [
    { data: latestData, metadata: latestMetaData },
    { data: yesterdayData },
  ] = await getAllVaccineData(2);
  const { value: latestFetchyRun } = await getCachedLatestFetchyRun();

  return {
    lastCheckedAtTimeUtc: latestFetchyRun?.run_started_at ?? null,
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
  vaccineData: DhbVaccineDoseData[],
  previousVaccineData: DhbVaccineDoseData[]
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

  return vaccineData.map((dhb) => {
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

    const previousDoseData = previousVaccineData.find(
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

    const previousFirstDosesPercentage = previousDoseData
      ? calculateDosePercentage(
          previousDoseData.firstDoses,
          previousDoseData.totalPopulation
        )
      : null;

    const previousSecondDosesPercentage = previousDoseData
      ? calculateDosePercentage(
          previousDoseData.secondDoses,
          previousDoseData.totalPopulation
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
      firstDosesPercentChange: previousFirstDosesPercentage
        ? firstDosesPercentage - previousFirstDosesPercentage
        : null,
      secondDosesPercentChange: previousSecondDosesPercentage
        ? secondDosesPercentage - previousSecondDosesPercentage
        : null,
    };
  });
}
