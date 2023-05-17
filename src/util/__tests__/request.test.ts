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
});
