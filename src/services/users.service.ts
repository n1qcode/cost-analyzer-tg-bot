import $api from "../http";
import { IHttpResponse } from "../http/http.interface";
import {
  IUsersCurrencies,
  IUsersLastPlaces,
  IUsersSetCurrencyBody,
  IUsersSetPlaceBody,
} from "../typings/users.typings";

export const usersService = {
  getLastUsersPlaces: async () =>
    $api.get<IHttpResponse<IUsersLastPlaces[]>>("/users/places"),
  getUsersCurrencies: async () =>
    $api.get<IHttpResponse<IUsersCurrencies[]>>("/users/currencies"),
  setLastUserPlace: async (body: IUsersSetPlaceBody) =>
    $api.put<IHttpResponse<void>>("/users/place", body),
  setUserCurrency: async (body: IUsersSetCurrencyBody) =>
    $api.put<IHttpResponse<void>>("/users/currency", body),
};
