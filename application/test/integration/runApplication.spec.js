const {
  Request,
  Response,
  Headers,
  FetchError,
} = require('node-fetch');

const runApplication = require('../../lib/runApplication');

describe('runApplication', () => {
  let inputData;
  let fetchMock;
  let storeActionFactoryMock;
  let fetchActionFactoryMock;
  let storeActionMock;
  let fetchActionMock;

  beforeEach(function beforeEach() {
    // eslint-disable-next-line global-require
    inputData = require('../../data');

    // Mock fetch
    fetchMock = this.sinon.stub();
    fetchMock.default = fetchMock;
    fetchMock.Promise = global.Promise;
    fetchMock.Headers = Headers;
    fetchMock.Request = Request;
    fetchMock.Response = Response;
    fetchMock.FetchError = FetchError;

    // Mock store action
    const storeToP2PRequest = new Request('http://p2p-service.url/give-me-data');
    const storeToHostedUrl = new Request('http://hosted-service.url/i-will-take-data-ha-ha');

    fetchMock.onCall(0).returns(new Response());
    fetchMock.onCall(1).returns(new Response());

    storeActionFactoryMock = this.sinon.stub().callsFake((p2pFetch, hostedFetch) => {
      storeActionMock = this.sinon.stub().callsFake(async (data) => {
        const postJSONOptions = {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        };

        await p2pFetch(storeToP2PRequest, postJSONOptions);
        await hostedFetch(storeToHostedUrl, postJSONOptions);
      });

      return storeActionMock;
    });

    // Mock fetch action
    const fetchFromP2PUrl = 'http://p2p-service.url/take-this';
    const fetchFromHostedUrl = 'http://hosted-service.url/ya-ya-more-data';

    const inputDataJSON = JSON.stringify(inputData);

    fetchMock.onCall(2).returns(new Response(inputDataJSON));
    fetchMock.onCall(3).returns(new Response(inputDataJSON));

    fetchActionFactoryMock = this.sinon.stub().callsFake((p2pFetch, hostedFetch) => {
      fetchActionMock = this.sinon.stub().callsFake(async () => {
        await p2pFetch(fetchFromP2PUrl);
        await hostedFetch(fetchFromHostedUrl);

        return inputData;
      });

      return fetchActionMock;
    });
  });

  it('should call actions and output result', async () => {
    const {
      expenses,
      p2pTraffic,
      hostedTraffic,
      storeElapsedTime,
      fetchElapsedTime,
    } = await runApplication(
      storeActionFactoryMock,
      fetchActionFactoryMock,
      fetchMock,
      inputData,
    );

    expect(expenses).to.be.above(0);
    expect(p2pTraffic.getAll()).to.have.length(2);
    expect(hostedTraffic.getAll()).to.have.length(2);
    expect(storeElapsedTime).to.be.above(0);
    expect(fetchElapsedTime).to.be.above(0);
  });
});
