import { DhbName } from "../../shared/types/VaccineDataTypes";

const nameMap: Partial<Record<DhbName, string>> = {
  Tairawhiti: "Tairāwhiti",
  Waitemata: "Waitematā",
};

const dhbDisplayName = (raw: DhbName): string => nameMap[raw] ?? raw;

export default dhbDisplayName;
