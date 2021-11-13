import { DhbVaccineDoseData } from "../../shared/types/VaccineDataTypes";

export type DhbRegionId = "auckland" | "northIsland" | "southIsland";

export type DhbVaccineDoseDataForIndexPage = DhbVaccineDoseData & {
  regionIds: DhbRegionId[];
  firstDosesPercentage: number;
  firstDosesChange: number | null;
  secondDosesPercentage: number;
  secondDosesChange: number | null;
  hasMetFirstDoseTarget: boolean;
  hasMetSecondDoseTarget: boolean;
};

export type IndexPageProps = {
  allDhbsVaccineDoseData: DhbVaccineDoseDataForIndexPage[];
  dataValidAsAtTimeUtc: string;
  dataUpdatedAtTimeUtc: string;
  lastCheckedAtTimeUtc?: string;
};
