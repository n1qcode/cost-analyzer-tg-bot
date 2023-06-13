export interface IHttpResponse<T> {
  isError?: boolean;
  payload: T;
}
