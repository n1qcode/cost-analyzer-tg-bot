import $api from "../http";
import { IHttpResponse } from "../http/http.interface";
import {
  IUsersCurrencies,
  IUsersLastPlaces,
  IUsersSetCurrencyBody,
  IUsersSetFinanceBody,
  IUsersSetPlaceBody,
} from "../typings/users.typings";

export const usersService = {
  getLastUsersPlaces: async () =>
    $api.get<IHttpResponse<IUsersLastPlaces[]>>("/users/places"),
  getUsersInfo: async () =>
    $api.get<IHttpResponse<IUsersCurrencies[]>>("/users/currencies"),
  setUserFinanceInfo: async (body: IUsersSetFinanceBody) =>
    $api.put<IHttpResponse<void>>("/users/finance", body),
  setLastUserPlace: async (body: IUsersSetPlaceBody) =>
    $api.put<IHttpResponse<void>>("/users/place", body),
  setUserCurrency: async (body: IUsersSetCurrencyBody) =>
    $api.put<IHttpResponse<void>>("/users/currency", body),
};
