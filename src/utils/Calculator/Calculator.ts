import { t } from "../../i18n";

import {
  ICalcSumResult,
  ICalculator,
  IMathSign,
  IDivideChar,
} from "./Calculator.interface";

class Calculator implements ICalculator {
  readonly #INPUT_REGEX =
    /^\s*-?\d{1,8}(?:[.,]\d{1,2})?(?:\s*[*+]\s*-?\d{1,8}(?:[.,]\d{1,2})?)*\s*$/;

  readonly #MAX_NUM_REGEX = /^((?!0)\d{1,8}|0|\\d{1,2})($|\.$|\.\d{1,2}$)/;

  readonly #DIVIDE_CHAR: IDivideChar = {
    DOT: ".",
    COMMA: ",",
  };

  readonly #MATH_SIGN: IMathSign = {
    MULTI: "*",
    PLUS: "+",
  };

  #valuesReducer(values: string[], operation: IMathSign[keyof IMathSign]) {
    return values.reduce(
      (accum, curr) => {
        const valueForAdd = Math.abs(
          curr.includes(this.#DIVIDE_CHAR.COMMA)
            ? +curr.split(this.#DIVIDE_CHAR.COMMA).join(this.#DIVIDE_CHAR.DOT)
            : +curr
        );
        return operation === this.#MATH_SIGN.MULTI
          ? accum * valueForAdd
          : accum + valueForAdd;
      },
      operation === this.#MATH_SIGN.MULTI ? 1 : 0
    );
  }

  roundHalfUp(value: number, decimals = 2) {
    return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
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

    if (isMultiplication && isAddition) {
      const initValue = value
        .split(this.#MATH_SIGN.MULTI)
        .map((elem) => elem.split(this.#MATH_SIGN.PLUS));
      const valuesForMulti: string[][] = [];
      for (let i = 0; i < initValue.length; i++) {
        const curr = initValue[i];
        if (!i) valuesForMulti.push([]);
        if (curr.length === 1)
          valuesForMulti[valuesForMulti.length - 1].push(curr.pop() ?? "");
        else {
          if (i)
            valuesForMulti[valuesForMulti.length - 1].push(curr.shift() ?? "");
          if (i !== initValue.length - 1) {
            if (i) valuesForMulti.push([]);
            valuesForMulti[valuesForMulti.length - 1].push(curr.pop() ?? "");
          }
        }
      }
      const valuesForAddition = initValue.flat();
      for (const multiValue of valuesForMulti)
        totalSum += this.#valuesReducer(multiValue, this.#MATH_SIGN.MULTI);
      totalSum += this.#valuesReducer(valuesForAddition, this.#MATH_SIGN.PLUS);
    } else if (isMultiplication && !isAddition)
      totalSum = this.#valuesReducer(
        value.split(this.#MATH_SIGN.MULTI),
        this.#MATH_SIGN.MULTI
      );
    else if (!isMultiplication && isAddition)
      totalSum = this.#valuesReducer(
        value.split(this.#MATH_SIGN.PLUS),
        this.#MATH_SIGN.PLUS
      );
    else totalSum = Math.abs(+value);

    result.value = this.roundHalfUp(totalSum);

    if (!this.#MAX_NUM_REGEX.test(String(result.value))) {
      result.info = `<b>${result.value}</b> - ${t("typed_add_cost_too_big")}`;
      result.isCorrect = false;
    }

    return result;
  }
}

export default new Calculator();
