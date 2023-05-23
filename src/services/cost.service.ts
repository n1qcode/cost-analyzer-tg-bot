import $api from "../http";

export const costService = {
  createCostCategory: (props: { cost_category: string }) =>
    $api.post("/cost", props),
  addToCostCategory: async (props: {
    user_id: number;
    cost_category: string;
    cost_amount: number;
  }) => $api.put("/cost/amount", props),
  getCostCategories: async () => $api.get("/cost/categories"),
  getDayCost: async (cost_date: string) => $api.get(`/cost/day/${cost_date}`),
  getMonthCost: async (year: string, month: string) =>
    $api.get(`/cost/year/${year}/month/${month}`),
  getAllCost: async (props: { cost_category: string }) => console.log(props),
  getYearCost: async (props: { cost_category: string }) => console.log(props),
  getSeasonCost: async (props: { cost_category: string }) => console.log(props),
  getPeriodCost: async (props: { cost_category: string }) => console.log(props),
};
