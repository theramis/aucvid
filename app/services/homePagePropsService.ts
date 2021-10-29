import { HomePageProps } from "../pages";
import { DateTime } from "luxon";
import getVaccineData from "./vaccineDataService";
import { DhbPopulationDoseData } from "../types/VaccineDataTypes";
import { CONSTANTS } from "./constants";

// making it global so hopefully it gets cached by lambda
let cachedData: HomePageProps | null = null;

export default async function fetchHomePageProps(): Promise<HomePageProps> {
  if (
    cachedData == null ||
    isCacheExpired(cachedData, CONSTANTS.cacheHomePageDataTtlInMins)
  ) {
    cachedData = await generateHomePageProps();
  }

  return cachedData;
}

const isCacheExpired = (data: HomePageProps, ttl: number) =>
  DateTime.utc().diff(DateTime.fromISO(data.dataFetchedAtTimeUtc), "minutes")
    .minutes >= ttl;

async function generateHomePageProps(): Promise<HomePageProps> {
  const vaccineData = await getVaccineData();

  const aucklandDhbNames = ["Auckland", "Counties Manukau", "Waitemata"];
  const aucklandDhbsPopulationDoseData = vaccineData.vaccinationsPerDhb.filter(
    (d) => aucklandDhbNames.includes(d.dhbName)
  );

  const combinedAucklandDhbsPopulationDoseData =
    getCombinedAucklandDhbsPopulationDoseData(aucklandDhbsPopulationDoseData);
  return {
    allDhbsPopulationDoseData: vaccineData.vaccinationsPerDhb,
    aucklandDhbsPopulationDoseData,
    combinedAucklandDhbsPopulationDoseData,
    dataValidAsAtTimeUtc: vaccineData.dataValidAsAtTimeUtc.toISO(),
    dataFetchedAtTimeUtc: DateTime.now().toUTC().toISO(),
  };
}

const getCombinedAucklandDhbsPopulationDoseData = (
  data: DhbPopulationDoseData[]
): DhbPopulationDoseData => {
  const combinedData: DhbPopulationDoseData = {
    dhbName: "Combined Auckland DHBs",
    numOfFirstDoses: 0,
    firstDosesPercentage: 0,
    hasMetFirstDoseTarget: false,
    numOfFirstDosesTo90Percent: 0,
    numOfSecondDoses: 0,
    secondDosesPercentage: 0,
    hasMetSecondDoseTarget: false,
    numOfSecondDosesTo90Percent: 0,
    totalPopulation: 0,
  };

  data.forEach((d) => {
    combinedData.numOfFirstDoses += d.numOfFirstDoses;
    combinedData.numOfFirstDosesTo90Percent += d.numOfFirstDosesTo90Percent;
    combinedData.numOfSecondDoses += d.numOfSecondDoses;
    combinedData.numOfSecondDosesTo90Percent += d.numOfSecondDosesTo90Percent;
    combinedData.totalPopulation += d.totalPopulation;
    combinedData.firstDosesPercentage = roundTo2Dp(
      combinedData.numOfFirstDoses / combinedData.totalPopulation
    );
    combinedData.hasMetFirstDoseTarget =
      combinedData.firstDosesPercentage >= CONSTANTS.firstDoseTargetPercentage;
    combinedData.secondDosesPercentage = roundTo2Dp(
      combinedData.numOfSecondDoses / combinedData.totalPopulation
    );
    combinedData.hasMetSecondDoseTarget =
      combinedData.secondDosesPercentage >=
      CONSTANTS.secondDoseTargetPercentage;
  });

  return combinedData;
};

const roundTo2Dp = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
