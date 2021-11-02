import { DhbName } from "../../shared/types/VaccineDataTypes";

const nameMap: Record<DhbName, string> = {
  Auckland: "Auckland",
  "Bay of Plenty": "Bay of Plenty",
  Canterbury: "Canterbury",
  "Capital and Coast": "Capital and Coast",
  "Counties Manukau": "Counties Manukau",
  "Hawkes Bay": "Hawkes Bay",
  "Hutt Valley": "Hutt Valley",
  Lakes: "Lakes",
  MidCentral: "MidCentral",
  "Nelson Marlborough": "Nelson Marlborough",
  "Overseas / Unknown": "Overseas / Unknown",
  Northland: "Northland",
  "South Canterbury": "South Canterbury",
  Southern: "Southern",
  Tairawhiti: "Tairāwhiti",
  Taranaki: "Taranaki",
  Waikato: "Waikato",
  Wairarapa: "Wairarapa",
  Waitemata: "Waitematā",
  "West Coast": "West Coast",
  Whanganui: "Whanganui",
};

const dhbDisplayName = (raw: DhbName): string => {
  if (raw in nameMap) {
    return nameMap[raw];
  }

  return raw;
};

export default dhbDisplayName;
