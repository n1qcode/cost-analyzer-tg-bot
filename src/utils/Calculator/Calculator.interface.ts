export interface ISeparateChar {
  DOT: ".";
  COMMA: ",";
}

export interface IMathSign {
  MULTI: "*";
  PLUS: "+";
}

export interface ICalcSumResult {
  value: number;
  info: string;
  isCorrect: boolean;
}

export interface ICalculator {
  roundHalfUp: (value: number, decimals: number) => number;
  sum: (value: string) => ICalcSumResult;
}
