const nameMap: Record<string, string> = {
  Auckland: "Auckland",
  "Bay of Plenty": "Bay of Plenty",
  Canterbury: "Canterbury",
  "Capital and Coast": "Capital and Coast",
  "Counties Manukau": "Counties Manukau",
  "Hawkes Bay": "Hawkes Bay",
  "Hutt Valley": "Hutt Valley",
  Lakes: "Lakes",
  MidCentral: "MidCentral",
  "Nelson Malborough": "Nelson Malborough",
  "Overseas / Unknown": "Overseas / Unknown",
  Northland: "Northland",
  "South Canterbury": "South Canterbury",
  Southern: "Southern",
  Tairawhiti: "Tairawhiti",
  Taranaki: "Taranaki",
  Waikato: "Waikato",
  Wairarapa: "Wairarapa",
  Waitemata: "Waitematā",
  "West Coast": "West Coast",
};

const dhbDisplayName = (raw: string): string => {
  if (raw in nameMap) {
    return nameMap[raw];
  }

  return raw;
};

export default dhbDisplayName;
