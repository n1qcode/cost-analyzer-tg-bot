import axios from "axios";

import { API_HOST } from "../utils/constants";

const $api = axios.create({
  baseURL: API_HOST,
});

export default $api;
