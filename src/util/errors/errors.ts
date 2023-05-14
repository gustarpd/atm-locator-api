import { InternalError } from './internal-error';

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'Unexpected error when trying to communicate api';
    super(`${internalMessage}: ${message}`);
  }
}

export class APIResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = 'Unexpected error returned by the service';
    super(`${internalMessage}: ${message}`);
  }
}
