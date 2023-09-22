import $api from "../http";
import { IHttpResponse } from "../http/http.interface";
import {
  IFinance,
  IFinanceBody,
  IFinanceRotation,
} from "../typings/finance.typings";

export const financeService = {
  getInfoOfMoneyBox: async () =>
    $api.get<IHttpResponse<IFinance>>("/finance/money_box"),
  putMoneyToMoneyBox: async (body: IFinanceBody) =>
    $api.put<IHttpResponse<IFinance>>("/finance/money_box/put", body),
  takeMoneyFromMoneyBox: async (body: IFinanceBody) =>
    $api.put<IHttpResponse<IFinance>>("/finance/money_box/take", body),
  getInfoOfPocketMoney: async () =>
    $api.get<IHttpResponse<IFinance>>("/finance/pocket_money"),
  putMoneyToPocketMoney: async (body: IFinanceBody) =>
    $api.put<IHttpResponse<IFinance>>("/finance/pocket_money/put", body),
  takeMoneyFromPocketMoney: async (body: IFinanceBody) =>
    $api.put<IHttpResponse<IFinance>>("/finance/pocket_money/take", body),
  rotateFromMoneyBoxToPocketMoney: async (body: IFinanceBody) =>
    $api.put<IHttpResponse<IFinanceRotation>>(
      "/finance/money_rotation/from_money_box_to_pocket_money",
      body
    ),
  rotateFromPocketMoneyToMoneyBox: async (body: IFinanceBody) =>
    $api.put<IHttpResponse<IFinanceRotation>>(
      "/finance/money_rotation/from_pocket_money_to_money_box",
      body
    ),
};
