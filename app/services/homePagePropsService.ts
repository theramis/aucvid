import { HomePageProps } from "../pages/index";
import { DateTime } from "luxon";
import getVaccineData from "./vaccineDataService";
import {
  DhbRegionId,
  DhbPopulationDoseDataWithRegion,
} from "../types/VaccineDataTypes";
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

  const aucklandDhbNames = ["Waitemata", "Auckland", "Counties Manukau"];
  const northIslandDhbNames = aucklandDhbNames.concat([
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
  const southIslandDhbNames = [
    "Nelson Marlborough",
    "West Coast",
    "Canterbury",
    "South Canterbury",
    "Southern",
  ];

  const mappedWithRegion: DhbPopulationDoseDataWithRegion[] =
    vaccineData.vaccinationsPerDhb.map((dhb) => {
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
      };
    });

  return {
    allDhbsPopulationDoseData: mappedWithRegion,
    dataValidAsAtTimeUtc: vaccineData.dataValidAsAtTimeUtc.toISO(),
    dataFetchedAtTimeUtc: DateTime.now().toUTC().toISO(),
  };
}

const roundTo2Dp = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100;
