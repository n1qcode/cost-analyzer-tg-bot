import $api from "../http";
import { IFrequency } from "../typings/frequency.typings";
import { IHttpResponse } from "../http/http.interface";

export const frequencyService = {
  getCategoriesByFrequency: async () =>
    $api.get<IHttpResponse<IFrequency[]>>("/frequency"),
};
