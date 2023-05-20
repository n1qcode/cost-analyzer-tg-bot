import $api from "../http";

export const costService = {
  createCostCategory: (props: { cost_category: string }) =>
    $api.put("/cost", props),
  addToCostCategory: async (props: {
    user_id: number;
    cost_category: string;
    cost_amount: number;
  }) => $api.put("/user/cost/amount", props),
  getDayCostOfUser: async (user_id: number, cost_date: string) =>
    $api(`/user/${user_id}/cost/day/${cost_date}`),
  getDayCost: async (cost_date: string) => $api.get(`/cost/day/${cost_date}`),
  getAllCostOfUser: async (props: { cost_category: string }) =>
    console.log(props),
  getAllCost: async (props: { cost_category: string }) => console.log(props),
  getYearCostOfUser: async (props: { cost_category: string }) =>
    console.log(props),
  getYearCost: async (props: { cost_category: string }) => console.log(props),
  getSeasonCostOfUser: async (props: { cost_category: string }) =>
    console.log(props),
  getSeasonCost: async (props: { cost_category: string }) => console.log(props),
  getMonthCostOfUser: async (props: { cost_category: string }) =>
    console.log(props),
  getMonthCost: async (props: { cost_category: string }) => console.log(props),
  getPeriodCostOfUser: async (props: { cost_category: string }) =>
    console.log(props),
  getPeriodCost: async (props: { cost_category: string }) => console.log(props),
  getCostCategories: async () => $api("/cost/categories"),
};
