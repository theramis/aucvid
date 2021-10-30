export const convertToNumber = (s: string): number =>
  Number(s.replace(/[%,]/g, ""));
