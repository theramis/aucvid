import { DateTime } from "luxon";

export type DhbRegionId = "auckland" | "northIsland" | "southIsland";

export type DhbPopulationDoseData = {
  dhbName: string;
  numOfFirstDoses: number;
  numOfFirstDosesTo90Percent: number;
  firstDosesPercentage: number;
  hasMetFirstDoseTarget: boolean;
  numOfSecondDoses: number;
  numOfSecondDosesTo90Percent: number;
  secondDosesPercentage: number;
  hasMetSecondDoseTarget: boolean;
  totalPopulation: number;
};

export type DhbPopulationDoseDataWithRegion = DhbPopulationDoseData & {
  regionIds: DhbRegionId[];
};

export type VaccineData = {
  vaccinationsPerDhb: DhbPopulationDoseData[];
  dataValidAsAtTimeUtc: DateTime;
};
