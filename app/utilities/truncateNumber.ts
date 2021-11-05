const truncateNumber = (number: number, precision: number) => {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (precision || -1) + "})?");
  const result = number.toString().match(re);
  if (result) {
    return parseFloat(result[0]);
  }
  return number;
};

export default truncateNumber;
