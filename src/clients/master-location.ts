import { GetOAuth } from '../../src/util/mastercardOAuth'
import * as HTTPUtil from '../../src/util/request';
import { ATMs } from './IAtmResponse';
import { InternalError } from '../../src/util/errors/internal-error';
import { AxiosError } from 'axios';
import { APIResponseError, ClientRequestError } from '../../src/util/errors/errors';

interface ATMsResponse {
  Atms: {
    Atm: ATMs[];
  };
}
export class MastercardATMs {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(protected request = new HTTPUtil.Request()) {}
  public async fetchATMs(): Promise<any> {
    try {
      const response = await this.request.get<ATMsResponse>(
        `${process.env.MASTERCARD_API_URL}`,
        {
          headers: {
            Authorization: GetOAuth.oauthHeaderAuthorization(process.env.MASTERCARD_API_URL),
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (
        error instanceof InternalError &&
        HTTPUtil.Request.isAxiosError(error)
      ) {
        throw new APIResponseError(
          `Error: ${JSON.stringify(
            (error as unknown as AxiosError).response?.data
          )} Code: ${(error as unknown as AxiosError).response?.status}`
        );
      }
      throw new ClientRequestError((error as { message: any }).message);
    }
  }
}