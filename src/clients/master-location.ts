import { GetOAuth } from '../util/mastercardOAuth';
import * as HTTPUtil from '../../src/util/request';
import { ATMs } from './IAtmResponse';
import { InternalError } from '../../src/util/errors/internal-error';
import { AxiosError } from 'axios';

interface ATMsResponse {
  Atms: {
    Atm: ATMs[];
  };
}

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error when trying to communicate to ATM api';
    super(`${internalMessage}: ${message}`);
  }
}

export class MasterCardAPIResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'Unexpected error returned by the  service';
    super(`${internalMessage}: ${message}`);
  }
}
export class MastercardATMs {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(protected request = new HTTPUtil.Request()) {}
  public async fetchATMs(): Promise<any> {
    try {
      const response = await this.request.get<ATMsResponse>(
        `${process.env.MASTERCARD_SANDBOX}`,
        {
          headers: {
            Authorization: GetOAuth.oauthHeaderAuthorization(),
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (
        error instanceof InternalError &&
        HTTPUtil.Request.isAxiosError(error)
      ) {
        throw new MasterCardAPIResponseError(
          `Error: ${JSON.stringify(
            (error as unknown as AxiosError).response?.data
          )} Code: ${(error as unknown as AxiosError).response?.status}`
        );
      }
      throw new ClientRequestError((error as { message: any }).message);
    }
  }
}