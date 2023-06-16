import $api from "../http";
import { IHttpResponse } from "../http/http.interface";

export const costService = {
  createCostCategory: async (props: {
    cost_category: string;
    translation: string;
  }) => $api.post<IHttpResponse>("/cost", props),
  addToCostCategory: async (props: {
    cost_category: string;
    cost_amount: number;
  }) => $api.put<IHttpResponse<string>>("/cost/amount", props),
  updateTranslationCostCategory: async (props: {
    cost_category: string;
    translation: string;
  }) => $api.put<IHttpResponse<string>>("/cost/translation", props),
  getTranslationCostCategory: async () =>
    $api.get<IHttpResponse<Record<string, string>>>("/cost/translation"),
  getCostCategories: async () =>
    $api.get<IHttpResponse<string[]>>("/cost/categories"),
  getDayCost: async (cost_date: string) =>
    $api.get<IHttpResponse<Array<object>>>(`/cost/day/${cost_date}`),
  getMonthCost: async (year: string, month: string) =>
    $api.get<IHttpResponse<Array<object>>>(`/cost/year/${year}/month/${month}`),
  getAllCost: async () =>
    $api.get<IHttpResponse<Record<string, string>[]>>("/cost"),
  getYearCost: async (props: { cost_category: string }) => console.log(props),
  getSeasonCost: async (props: { cost_category: string }) => console.log(props),
  getPeriodCost: async (props: { cost_category: string }) => console.log(props),
};
