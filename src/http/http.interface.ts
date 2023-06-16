export interface IHttpResponse<T = undefined> {
  error?: string;
  payload?: T;
}
