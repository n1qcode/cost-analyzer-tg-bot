import percentageOfAccum from "../percentageDiff";

const data = [
  {
    first: 130,
    second: 50,
    output: 61.53846153846154,
  },
  {
    first: 50,
    second: 130,
    output: 160,
  },
  {
    first: -50,
    second: 130,
    output: 360,
  },
  {
    first: 50,
    second: -130,
    output: 360,
  },
  {
    first: 50,
    second: 0,
    output: 100,
  },
  {
    first: 0,
    second: 130,
    output: 0,
  },
  {
    first: 0,
    second: 0,
    output: 0,
  },
];

describe("percentageOfAccum", () => {
  it.each(data)("%#: %o", (testCase) => {
    const { first, second, output } = testCase;
    expect(percentageOfAccum(first, second)).toBe(output);
  });
});
