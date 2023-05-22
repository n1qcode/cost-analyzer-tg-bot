import $api from "../http";

export const costService = {
  createCostCategory: (props: { cost_category: string }) =>
    $api.put("/cost", props),
  addToCostCategory: async (props: {
    user_id: number;
    cost_category: string;
    cost_amount: number;
  }) => $api.put("/cost/amount", props),
  getDayCost: async (cost_date: string) => $api.get(`/cost/day/${cost_date}`),
  getAllCost: async (props: { cost_category: string }) => console.log(props),
  getYearCost: async (props: { cost_category: string }) => console.log(props),
  getSeasonCost: async (props: { cost_category: string }) => console.log(props),
  getMonthCost: async (year: string, month: string) =>
    $api.get(`/cost/year/${year}/month/${month}`),
  getPeriodCost: async (props: { cost_category: string }) => console.log(props),
  getCostCategories: async () => $api("/cost/categories"),
};
