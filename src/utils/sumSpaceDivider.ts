import { SPACE } from "./constants";

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

  const transformedSum = String(+sum);
  const preparedValue = transformedSum.includes(".")
    ? transformedSum.split(".")
    : transformedSum;
  const isArray = Array.isArray(preparedValue);

  const value = isArray ? preparedValue[0].split("") : preparedValue.split("");

  if (value.length >= 7 && value.length <= 8) {
    const idx = String(value.length);
    value.splice(spliceIdxComplex[idx][0], 0, SPACE);
    value.splice(spliceIdxComplex[idx][1], 0, SPACE);
  } else if (value.length >= 4 && value.length <= 6)
    value.splice(spliceIdx[String(value.length)], 0, SPACE);

  return `${value.join("")}${isArray ? `.${preparedValue[1]}` : ""}`;
};

export default sumSpaceDivider;
