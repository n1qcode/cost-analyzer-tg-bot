const percentageOfAccum = (first: number, second: number): number => {
  if (first === 0) return 0;
  return Math.abs((second * 100) / first - 100);
};

export default percentageOfAccum;
