const sumSpaceDivider = (sum: string) => {
  const spliceIdx: Record<string, number> = {
    "4": 1,
    "5": 2,
    "6": 3,
  };

  const spliceIdxComplex: Record<string, number[]> = {
    "7": [1, 5],
    "8": [2, 6],
  };

  const value = sum.includes(".") ? sum.split(".")[0].split("") : sum.split("");

  if (value.length >= 7) {
    const idx = String(value.length);
    value.splice(spliceIdxComplex[idx][0], 0, " ");
    value.splice(spliceIdxComplex[idx][1], 0, " ");
  } else value.splice(spliceIdx[String(value.length)], 0, " ");

  return value.join("");
};

export default sumSpaceDivider;
