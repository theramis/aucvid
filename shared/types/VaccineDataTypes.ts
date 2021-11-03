export type DhbVaccineDoseData = {
  dhbName: DhbName;
  firstDoses: number;
  firstDosesPercentage: number;
  firstDosesTo90Percent: number;
  secondDoses: number;
  secondDosesPercentage: number;
  secondDosesTo90Percent: number;
  totalPopulation: number;
};

export type NzTimeIso = string;
export type DataPeriod = "latest" | "yesterday";

export type VaccineData = {
  vaccinationsPerDhb: DhbVaccineDoseData[];
  dataValidAsAtNzTimeIso: NzTimeIso;
};

type NorthIslandDhbKeys =
  | "Northland"
  | "Waitemata"
  | "Auckland"
  | "Counties Manukau"
  | "Waikato"
  | "Lakes"
  | "Bay of Plenty"
  | "Tairawhiti"
  | "Taranaki"
  | "Hawkes Bay"
  | "MidCentral"
  | "Whanganui"
  | "Capital and Coast"
  | "Hutt Valley"
  | "Wairarapa";

type SouthIslandDhbKeys =
  | "Nelson Marlborough"
  | "West Coast"
  | "Canterbury"
  | "South Canterbury"
  | "Southern";

type OverseasUnknown = "Overseas / Unknown";

export type DhbName = NorthIslandDhbKeys | SouthIslandDhbKeys | OverseasUnknown;
