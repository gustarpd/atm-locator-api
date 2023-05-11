import { InternalError } from '../../src/util/errors/internal-error';
import * as HTTPUtil from '../../src/util/request';
import { AxiosError, isAxiosError } from 'axios';
import {
  APIResponseError,
  ClientRequestError,
} from '../../src/util/errors/errors';

export interface locationsInfo {
  latitude: string;
  longitude: string;
}

export class Coordenates {
  constructor(
    private zipcode: string,
    protected request = new HTTPUtil.Request()
  ) {}

  public async getCoordenateWithZipCode(): Promise<any> {
    const url = `https://www.cepaberto.com/api/v3/cep?cep=${this.zipcode}`;

    try {
      const fetch = await this.request.get<locationsInfo>(url, {
        headers: {
          Authorization: `Token token=${process.env.CEPABERTO_API_TOKEN}`,
        },
      });
      return fetch.data;
    } catch (error) {
      if (error instanceof InternalError && isAxiosError(error)) {
        throw new ClientRequestError(
          `Error: ${JSON.stringify(
            (error as unknown as AxiosError).response?.data
          )} Code: ${(error as unknown as AxiosError).response?.status}`
        );
      }
      throw new APIResponseError((error as Error).message);
    }
  }
}
