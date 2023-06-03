export interface IDivideChar {
  DOT: ".";
  COMMA: ",";
}

export interface IMathSign {
  MULTI: "*";
  PLUS: "+";
  MINUS: "-";
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
