import * as HTTPUtil from '../../util/request';
import { Coordenates } from '../cordenates';
import mockresolved from './mock/location.json';

jest.mock('@src/util/request');

describe('CEP clients', () => {
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;
  const MockedRequestClass = HTTPUtil.Request as jest.Mocked<
    typeof HTTPUtil.Request
  >;
  it('should return location from CEP of user', async () => {
    mockedRequest.get.mockResolvedValue({
      data: mockresolved,
    } as HTTPUtil.Response);

    const request = new Coordenates('65908051', mockedRequest);
    const response = await request.getCoordenateWithZipCode();

    expect(response).toEqual(mockresolved);
  });

  it('should return request error by service', async () => {
    mockedRequest.get.mockRejectedValueOnce({
      message: 'Unexpected error returned by the service',
    });

    const request = new Coordenates('65908051', mockedRequest);
    await expect(request.getCoordenateWithZipCode()).rejects.toThrow(
      'Unexpected error returned by the service'
    );
  });
});
