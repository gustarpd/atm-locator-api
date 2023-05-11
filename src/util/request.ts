/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {}
export interface Response<T = any> extends AxiosResponse<T> {}

export class Request {
  constructor(private request = axios) {}

  public get<T>(url: string, config: RequestConfig = {}): Promise<Response<T>> {
    return this.request.get<T>(url, config);
  }

  public post<T>(
    url: string,
    options: string,
    config: RequestConfig = {}
  ): Promise<Response<T>> {
    return this.request.post<T>(url, options, config);
  }

  static isRequestError(err: Error) {
    throw new Error('Method not implemented.');
  }

  static isAxiosError(error: Error): boolean {
    return !!((error as AxiosError).response && (error as AxiosError)?.status);
  }
}
