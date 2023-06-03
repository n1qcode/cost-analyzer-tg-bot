import { t } from "../../i18n";

import {
  ICalcSumResult,
  ICalculator,
  IMathSign,
  IDivideChar,
} from "./Calculator.interface";

class Calculator implements ICalculator {
  readonly #INPUT_REGEX =
    /^\s*\d{1,8}(?:[.,]\d{1,2})?(?:\s*[*+-]\s*\d{1,8}(?:[.,]\d{1,2})?)*\s*$/;

  readonly #MAX_NUM_REGEX = /^((?!0)\d{1,8}|0|\\d{1,2})($|\.$|\.\d{1,2}$)/;

  readonly #DIVIDE_CHAR: IDivideChar = {
    DOT: ".",
    COMMA: ",",
  };

  readonly #MATH_SIGN: IMathSign = {
    MULTI: "*",
    PLUS: "+",
    MINUS: "-",
  };

  #divideCharConvertor(value: string) {
    return Math.abs(
      value.includes(this.#DIVIDE_CHAR.COMMA)
        ? +value.split(this.#DIVIDE_CHAR.COMMA).join(this.#DIVIDE_CHAR.DOT)
        : +value
    );
  }

  #valuesReducer(values: string[], operation: IMathSign[keyof IMathSign]) {
    const valuesForReduce = [...values];
    if (operation === this.#MATH_SIGN.MINUS)
      valuesForReduce.sort((a, b) => {
        return this.#divideCharConvertor(b) - this.#divideCharConvertor(a);
      });
    return values.reduce(
      (accum, curr, index) => {
        const valueForAdd = this.#divideCharConvertor(curr);
        return operation === this.#MATH_SIGN.MULTI
          ? accum * valueForAdd
          : operation === this.#MATH_SIGN.PLUS
          ? accum + valueForAdd
          : !index
          ? accum + valueForAdd
          : accum - valueForAdd;
      },
      operation === this.#MATH_SIGN.MULTI ? 1 : 0
    );
  }

  roundHalfUp(value: number, decimals = 2) {
    return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
  }

  #multiParser(values: string[]) {
    const exitValue: string[] = [];

    const collection: {
      multi: string[][];
      add: string[];
      sub: string[];
      tempValue: string[];
      acceptedValues: number[];
    } = {
      multi: [],
      add: [],
      sub: [],
      tempValue: [],
      acceptedValues: [],
    };

    const _mathSigns = Object.values(this.#MATH_SIGN);

    for (let i = 0; i < values.length; i++) {
      const char = values[i];
      if (!_mathSigns.includes(char)) {
        collection.tempValue.push(char);
        if (i === values.length - 1) {
          collection.acceptedValues.push(+collection.tempValue.join(""));
          exitValue.push(
            String(collection.acceptedValues.reduce((a, b) => a * b, 1))
          );
        }
      } else {
        if (char !== this.#MATH_SIGN.MULTI) {
          if (!collection.acceptedValues.length)
            exitValue.push(...collection.tempValue, char);
          if (collection.acceptedValues.length) {
            collection.acceptedValues.push(+collection.tempValue.join(""));
            exitValue.push(
              String(collection.acceptedValues.reduce((a, b) => a * b, 1)),
              char
            );
            collection.acceptedValues = [];
          }
        } else collection.acceptedValues.push(+collection.tempValue.join(""));
        collection.tempValue = [];
      }
    }

    return exitValue;
  }

  #valuesReducerNew(values: string[]) {
    const collection: {
      totalSum: number;
      tempValue: string[];
    } = {
      totalSum: 0,
      tempValue: [],
    };

    const _mathSigns = Object.values(this.#MATH_SIGN);
    let operation: IMathSign[keyof IMathSign] | null = null;

    const _accum = () => {
      if (operation === this.#MATH_SIGN.PLUS)
        collection.totalSum += +collection.tempValue.join("");
      if (operation === this.#MATH_SIGN.MINUS)
        collection.totalSum -= +collection.tempValue.join("");
    };

    for (let i = 0; i < values.length; i++) {
      const char = values[i];
      if (!_mathSigns.includes(char)) {
        collection.tempValue.push(char);
        if (i === values.length - 1) _accum();
      } else {
        if (!operation) collection.totalSum = +collection.tempValue.join("");
        else _accum();
        operation = char as IMathSign[keyof IMathSign];
        collection.tempValue = [];
      }
    }

    return collection.totalSum;
  }

  // "105 + 33,1 - 123,45 * 2.0 + 67.89 * 3,0 - 10.99 + 99,99 * 4.0 - 10,01 + 5 + 6 + 7 + 11.11 * 5,0 + 1 + 2 + 3 - 22,22 * 6.0 + 33.33 * 7,0 + 44,44 * 8,0 + 55.55 * 9,0"

  sum(value: string) {
    const result: ICalcSumResult = {
      value: 0,
      info: "",
      isCorrect: true,
    };

    if (!this.#INPUT_REGEX.test(value)) {
      result.info = t("typed_add_cost_incorrect");
      result.isCorrect = false;
      return result;
    }

    let totalSum = 0;

    const isMultiplication = value.includes(this.#MATH_SIGN.MULTI);
    const isAddition = value.includes(this.#MATH_SIGN.PLUS);
    const isSubtraction = value.includes(this.#MATH_SIGN.MINUS);

    const preparedValue = value.includes(this.#DIVIDE_CHAR.COMMA)
      ? value
          .split(this.#DIVIDE_CHAR.COMMA)
          .join(this.#DIVIDE_CHAR.DOT)
          .split(" ")
          .join("")
          .split("")
      : value.split(" ").join("").split("");

    if (isMultiplication && (isAddition || isSubtraction)) {
      const parsedValues = this.#multiParser(preparedValue);
      totalSum = this.#valuesReducerNew(parsedValues);
    } else if (isMultiplication && !isAddition && !isSubtraction)
      totalSum = this.#valuesReducer(
        value.split(this.#MATH_SIGN.MULTI),
        this.#MATH_SIGN.MULTI
      );
    else if (!isMultiplication && isAddition && !isSubtraction)
      totalSum = this.#valuesReducer(
        value.split(this.#MATH_SIGN.PLUS),
        this.#MATH_SIGN.PLUS
      );
    else if (!isMultiplication && !isAddition && isSubtraction)
      totalSum = this.#valuesReducer(
        value.split(this.#MATH_SIGN.MINUS),
        this.#MATH_SIGN.MINUS
      );
    else if (!isMultiplication && isAddition && isSubtraction)
      totalSum = this.#valuesReducerNew(preparedValue);
    else totalSum = Math.abs(+value);

    if (totalSum < 0) {
      result.info = `<b>${this.roundHalfUp(totalSum)}</b> - ${t(
        "Сумма не должна быть отрицательной"
      )}`;
      result.isCorrect = false;
      return result;
    }

    result.value = this.roundHalfUp(totalSum);

    if (!this.#MAX_NUM_REGEX.test(String(result.value))) {
      result.info = `<b>${result.value}</b> - ${t("typed_add_cost_too_big")}`;
      result.isCorrect = false;
    }

    return result;
  }
}

export default new Calculator();

const calc = new Calculator();
// console.log(
//   calc.sum(
//     "105 + 33,1 - 123,45 * 2.0 + 67.89 * 3,0 - 10.99 + 99,99 * 4.0 - 10,01 + 5 + 6 + 7 + 11.11 * 5,0 + 1 + 2 + 3 - 22,22 * 6.0 + 33.33 * 7,0 + 44,44 * 8,0 + 55.55 * 9,0"
//   )
// );
// calc.sum(
//   "105 + 33,1 + 123,45 * 2.0 + 67.89 * 3,0 + 10.99 + 99,99 * 4.0 + 10,01 + 5 + 6 + 7 + 11.11 * 5,0 + 1 + 2 + 3 + 22,22 * 6.0 + 33.33 * 7,0 + 44,44 * 8,0 + 55.55 * 9,0"
// );
console.log(
  calc.sum(
    "105 - 33,1 - 123,45 * 2.0 - 67.89 * 3,0 - 10.99 - 99,99 * 4.0 - 10,01 - 5 - 6 - 7 - 11.11 * 5,0 - 1 - 2 - 3 - 22,22 * 6.0 - 33.33 * 7,0 - 44,44 * 8,0 - 55.55 * 9,0"
  )
);
