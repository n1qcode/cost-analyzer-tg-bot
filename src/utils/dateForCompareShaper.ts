import monthConvertor from "./monthConvertor";

const datesForCompareShaper = (month: number) => {
  const isLastYearFirst = month - 1 < 0;
  const isLastYearSecond = month - 2 < 0;
  const currentYear = new Date().getFullYear();
  const firstYear = isLastYearFirst ? currentYear - 1 : currentYear;
  const secondYear = isLastYearSecond ? currentYear - 1 : currentYear;
  const firstMonth = isLastYearFirst ? 11 : month - 1;
  const secondMonth = isLastYearSecond ? firstMonth - 1 : month - 2;

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
