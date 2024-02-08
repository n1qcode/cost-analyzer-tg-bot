import monthConvertor from "./monthConvertor";

const datesForCompareShaper = (month: number) => {
  const isFirstMonthLastYear = month - 1 < 0;
  const isSecondMonthLastYear = month - 2 < 0;
  const currentYear = new Date().getFullYear();
  const firstYear = isFirstMonthLastYear ? currentYear - 1 : currentYear;
  const secondYear = isSecondMonthLastYear ? currentYear - 1 : currentYear;
  const firstMonth = isFirstMonthLastYear ? 11 : month - 1;
  const secondMonth = isSecondMonthLastYear ? firstMonth - 1 : month - 2;

  const firstMonthFixed = monthConvertor(firstMonth);
  const secondMonthFixed = monthConvertor(secondMonth);

  return {
    firstYear,
    firstMonth: firstMonthFixed,
    secondYear,
    secondMonth: secondMonthFixed,
  };
};

export default datesForCompareShaper;
