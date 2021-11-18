import { DhbVaccineDoseData } from "../../shared/types/VaccineDataTypes";

export type DhbRegionId = "auckland" | "northIsland" | "southIsland";

export type DhbVaccineDoseDataForIndexPage = DhbVaccineDoseData & {
  regionIds: DhbRegionId[];
  firstDosesPercentage: number;
  firstDosesPercentChange: number | null;
  secondDosesPercentage: number;
  secondDosesPercentChange: number | null;
  hasMetFirstDoseTarget: boolean;
  hasMetSecondDoseTarget: boolean;
};

export type IndexPageProps = {
  allDhbsVaccineDoseData: DhbVaccineDoseDataForIndexPage[];
  dataValidAsAtTimeUtc: string;
  dataUpdatedAtTimeUtc: string;
  lastCheckedAtTimeUtc: string | null;
};
