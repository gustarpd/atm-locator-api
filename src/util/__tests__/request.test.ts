import * as HTTPUtil from '../request';

jest.mock('@src/util/request');
describe('test request methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;
  const MockedRequestClass = HTTPUtil.Request as jest.Mocked<
    typeof HTTPUtil.Request
  >;

  it('should make GET request and responda data fake', async () => {
    const responseFake = { data: 'some data' }
    mockedRequest.get.mockResolvedValue(responseFake as HTTPUtil.Response);
    const request = mockedRequest.get('some_url');
    expect(await request).toEqual(responseFake)
    expect(await request).toHaveProperty('data')
  });

  it('should make POST request with url, options and custom configs', async () => {
    const response = { data: 'response data' };
    const options = 'request options'
    const request = mockedRequest.post('some_api_url', options, {})
    mockedRequest.post.mockResolvedValue(response as HTTPUtil.Response);
    expect(mockedRequest.post).toHaveBeenCalledWith('some_api_url', options, {});
    expect(await request).toEqual(response)
    expect(await request).toHaveProperty('data')
  });
});
