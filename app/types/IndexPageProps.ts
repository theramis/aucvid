import { DhbVaccineDoseData } from "../../shared/types/VaccineDataTypes";

export type DhbRegionId = "auckland" | "northIsland" | "southIsland";

export type DhbVaccineDoseDataForIndexPage = DhbVaccineDoseData & {
  regionIds: DhbRegionId[];
  hasMetFirstDoseTarget: boolean;
  hasMetSecondDoseTarget: boolean;
};

export type IndexPageProps = {
  allDhbsVaccineDoseData: DhbVaccineDoseDataForIndexPage[];
  dataValidAsAtTimeUtc: string;
};