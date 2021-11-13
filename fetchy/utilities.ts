export const convertToNumber = (s: string): number => {
  const stripped = s.replace(/[%,]/g, "");
  const result = Number(stripped || NaN);
  if (Number.isNaN(result)) {
    throw new Error(`Could not convert string ${s} to a number.`);
  }
  return result;
};
