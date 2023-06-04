import $api from "../http";
import { IFrequency } from "../typings/frequency.typings";

export const frequencyService = {
  getCategoriesByFrequency: async () => $api.get<IFrequency[]>("/frequency"),
};
