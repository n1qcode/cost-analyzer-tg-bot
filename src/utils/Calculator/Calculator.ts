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

  roundHalfUp(value: number, decimals = 2) {
    return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
  }

  #convertor(value: string) {
    return value.includes(this.#DIVIDE_CHAR.COMMA)
      ? value
          .split(this.#DIVIDE_CHAR.COMMA)
          .join(this.#DIVIDE_CHAR.DOT)
          .split(" ")
          .join("")
      : value.split(" ").join("");
  }

  #singleReducer(value: string, operation: IMathSign[keyof IMathSign]) {
    const valuesForReduce = [...value.split(operation)];
    return valuesForReduce.reduce(
      (accum, curr, index) => {
        const valueForAdd = +curr;
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

  #complexReducer(value: string[] | string) {
    const originalValues = Array.isArray(value) ? value : value.split("");

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

    for (let i = 0; i < originalValues.length; i++) {
      const char = originalValues[i];
      if (!_mathSigns.includes(char)) {
        collection.tempValue.push(char);
        if (i === originalValues.length - 1) _accum();
      } else {
        if (!operation) collection.totalSum = +collection.tempValue.join("");
        else _accum();
        operation = char as IMathSign[keyof IMathSign];
        collection.tempValue = [];
      }
    }

    return collection.totalSum;
  }

  #multiParser(value: string) {
    const originalValues = value.split("");
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

    for (let i = 0; i < originalValues.length; i++) {
      const char = originalValues[i];
      if (!_mathSigns.includes(char)) {
        collection.tempValue.push(char);
        if (i === originalValues.length - 1) {
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

    const preparedValue = this.#convertor(value);

    if (isMultiplication && (isAddition || isSubtraction)) {
      const parsedValues = this.#multiParser(preparedValue);
      totalSum = this.#complexReducer(parsedValues);
    } else if (isMultiplication && !isAddition && !isSubtraction)
      totalSum = this.#singleReducer(preparedValue, this.#MATH_SIGN.MULTI);
    else if (!isMultiplication && isAddition && !isSubtraction)
      totalSum = this.#singleReducer(preparedValue, this.#MATH_SIGN.PLUS);
    else if (!isMultiplication && !isAddition && isSubtraction)
      totalSum = this.#singleReducer(preparedValue, this.#MATH_SIGN.MINUS);
    else if (!isMultiplication && isAddition && isSubtraction)
      totalSum = this.#complexReducer(preparedValue);
    else totalSum = Math.abs(+preparedValue);

    if (totalSum < 0) {
      result.info = `<b>${this.roundHalfUp(totalSum)}</b> - ${t(
        "not_negative_sum"
      )}`;
      result.isCorrect = false;
      return result;
    }

    if (String(totalSum).includes("e")) {
      result.value = totalSum;
      result.info = `<b>${result.value}</b> - ${t("typed_add_cost_too_big")}`;
      result.isCorrect = false;
    } else {
      result.value = this.roundHalfUp(totalSum);

      if (!result.value) {
        const isSingleInput = value.split(/([-+*])/).length === 1;
        result.info = isSingleInput
          ? t("not_zero_add_cost")
          : t("not_zero_add_cost_sum");
        result.isCorrect = false;
      } else if (!this.#MAX_NUM_REGEX.test(String(result.value))) {
        result.info = `<b>${result.value}</b> - ${t("typed_add_cost_too_big")}`;
        result.isCorrect = false;
      }
    }

    return result;
  }
}

export default new Calculator();
