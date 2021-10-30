export type DhbVaccineDoseData = {
  dhbName: string;
  firstDoses: number;
  firstDosesPercentage: number;
  firstDosesTo90Percent: number;
  secondDoses: number;
  secondDosesPercentage: number;
  secondDosesTo90Percent: number;
  totalPopulation: number;
};

export type NzTimeIso = string;

export type VaccineData = {
  vaccinationsPerDhb: DhbVaccineDoseData[];
  dataValidAsAtNzTimeIso: NzTimeIso;
};
