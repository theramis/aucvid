import { DhbVaccineDoseData } from "../../shared/types/VaccineDataTypes";

export type DhbRegionId = "auckland" | "northIsland" | "southIsland";

export type DhbVaccineDoseDataForIndexPage = DhbVaccineDoseData & {
  regionIds: DhbRegionId[];
  firstDosesChange: number;
  secondDosesChange: number;
  hasMetFirstDoseTarget: boolean;
  hasMetSecondDoseTarget: boolean;
};

export type IndexPageProps = {
  allDhbsVaccineDoseData: DhbVaccineDoseDataForIndexPage[];
  dataValidAsAtTimeUtc: string;
};
