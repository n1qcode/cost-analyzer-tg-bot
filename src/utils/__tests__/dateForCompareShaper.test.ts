import datesForCompareShaper from "../dateForCompareShaper";

const currentYear = new Date().getFullYear();

const data = [
  {
    describe: "January",
    input: 0,
    output: {
      firstYear: currentYear - 1,
      firstMonth: "12",
      secondYear: currentYear - 1,
      secondMonth: "11",
    },
  },
  {
    describe: "February",
    input: 1,
    output: {
      firstYear: currentYear,
      firstMonth: "01",
      secondYear: currentYear - 1,
      secondMonth: "12",
    },
  },
  {
    describe: "March",
    input: 2,
    output: {
      firstYear: currentYear,
      firstMonth: "02",
      secondYear: currentYear,
      secondMonth: "01",
    },
  },
  {
    describe: "April",
    input: 3,
    output: {
      firstYear: currentYear,
      firstMonth: "03",
      secondYear: currentYear,
      secondMonth: "02",
    },
  },
  {
    describe: "May",
    input: 4,
    output: {
      firstYear: currentYear,
      firstMonth: "04",
      secondYear: currentYear,
      secondMonth: "03",
    },
  },
  {
    describe: "June",
    input: 5,
    output: {
      firstYear: currentYear,
      firstMonth: "05",
      secondYear: currentYear,
      secondMonth: "04",
    },
  },
  {
    describe: "July",
    input: 6,
    output: {
      firstYear: currentYear,
      firstMonth: "06",
      secondYear: currentYear,
      secondMonth: "05",
    },
  },
  {
    describe: "August",
    input: 7,
    output: {
      firstYear: currentYear,
      firstMonth: "07",
      secondYear: currentYear,
      secondMonth: "06",
    },
  },
  {
    describe: "September",
    input: 8,
    output: {
      firstYear: currentYear,
      firstMonth: "08",
      secondYear: currentYear,
      secondMonth: "07",
    },
  },
  {
    describe: "October",
    input: 9,
    output: {
      firstYear: currentYear,
      firstMonth: "09",
      secondYear: currentYear,
      secondMonth: "08",
    },
  },
  {
    describe: "November",
    input: 10,
    output: {
      firstYear: currentYear,
      firstMonth: "10",
      secondYear: currentYear,
      secondMonth: "09",
    },
  },
  {
    describe: "December",
    input: 11,
    output: {
      firstYear: currentYear,
      firstMonth: "11",
      secondYear: currentYear,
      secondMonth: "10",
    },
  },
];

describe("dateForCompareShaper", () => {
  it.each(data)("%#: %o", (testCase) => {
    const { input, output } = testCase;
    expect(datesForCompareShaper(input)).toEqual(output);
  });
});
