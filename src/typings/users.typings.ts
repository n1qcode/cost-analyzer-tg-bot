import { CurrencyEnum, LastPlacesEnum } from "../utils/enums";

export interface IUsersSetPlaceBody {
  userId: number;
  lastPlace: LastPlacesEnum;
}

export interface IUsersSetCurrencyBody {
  userId: number;
  currency: CurrencyEnum;
}

export interface IUsersLastPlaces {
  user_id: string;
  last_place: LastPlacesEnum | null;
}

export interface IUsersCurrencies extends IUsersLastPlaces {
  currency: CurrencyEnum | null;
}
