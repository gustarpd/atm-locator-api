import * as HTTPUtil from '../../util/request';
import MockResolvedValue from './mock/atms.json';
import { MastercardATMs } from '../master-location';

jest.mock('@src/util/request');

describe('get all ATMs', () => {
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;
  const MockedRequestClass = HTTPUtil.Request as jest.Mocked<
    typeof HTTPUtil.Request
  >;

  it('should return all data from mastercard API', async () => {
    mockedRequest.get.mockResolvedValue({
      data: MockResolvedValue,
    } as HTTPUtil.Response);

    const mockRequest = new MastercardATMs(mockedRequest);
    const response = await mockRequest.fetchATMs();
    expect(response).toEqual(MockResolvedValue);
  });

  it('should return a generic erro when request fail', async () => {
    mockedRequest.get.mockRejectedValueOnce({ message: 'Network Error' });

    const request = new MastercardATMs(mockedRequest);
    await expect(request.fetchATMs()).rejects.toThrow(
      'Unexpected error when trying to communicate api: Network Error'
    );
  });

  it('should return a error when user call must request', async () => {
    MockedRequestClass.isAxiosError.mockReturnValue(true);

    mockedRequest.get.mockRejectedValue({
      response: {
        status: 429,
        data: { errors: ['Rate limit reached'] },
      },
    });

    const request = new MastercardATMs(mockedRequest);
    await expect(request.fetchATMs()).rejects.toThrow(
      'Unexpected error when trying to communicate api'
    );
  });

  it('should return Throw APIClentErro', () => {
    MockedRequestClass.isAxiosError.mockReturnValue(true);

    mockedRequest.get.mockRejectedValue({
      response: {
        status: 400,
        data: { errors: 'Bad request' },
      },
    });

    const request = new MastercardATMs(mockedRequest);
    expect(request.fetchATMs()).rejects.toThrow(
      'Unexpected error when trying to communicate api'
    );
  })
});
