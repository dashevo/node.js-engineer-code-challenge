const { Request, Response } = require('node-fetch');

const measureTrafficFactory = require('../../lib/measureTrafficFactory');

const compareRequestsFactory = require('../../lib/test/compareRequestsFactory');
const compareResponsesFactory = require('../../lib/test/compareResponsesFactory');

describe('measureTrafficFactory', () => {
  let fetchMock;
  let metricStorageMock;
  let measureTraffic;
  let requestUrl;
  let requestMethod;
  let requestOptions;
  let compareRequests;
  let compareResponses;

  beforeEach(function beforeEach() {
    requestUrl = 'http://test.url/';
    requestMethod = 'POST';
    requestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: requestMethod,
      body: JSON.stringify({
        test: 'request',
      }),
    };

    fetchMock = this.sinon.stub();
    metricStorageMock = {
      add: this.sinon.stub(),
    };

    measureTraffic = measureTrafficFactory(fetchMock, metricStorageMock);
    compareRequests = compareRequestsFactory(measureTraffic, metricStorageMock);
    compareResponses = compareResponsesFactory(measureTraffic, metricStorageMock, fetchMock);
  });

  it('should accept url and options and return response', async () => {
    const expectedResponse = new Response('{test: "response"}', { url: requestUrl });

    fetchMock.returns(Promise.resolve(expectedResponse));

    const actualResponse = await measureTraffic(requestUrl, requestOptions);

    expect(actualResponse).to.be.equal(expectedResponse);

    const wrappedRequest = new Request(requestUrl, requestOptions);

    expect(fetchMock).to.be.calledOnce();
    expect(fetchMock).to.be.calledWithExactly(wrappedRequest);

    expect(metricStorageMock.add).to.be.calledOnce();
  });

  it('should accept Request and calculate sizes of request and response', async () => {
    const request = new Request(requestUrl, requestOptions);

    const expectedResponse = new Response('{test: "response"}', { url: requestUrl });
    fetchMock.returns(Promise.resolve(expectedResponse));

    const actualResponse = await measureTraffic(request);

    expect(actualResponse).to.be.equal(expectedResponse);

    expect(fetchMock).to.be.calledOnce();
    expect(fetchMock).to.be.calledWithExactly(request);

    const concatenatedRequest = request.url +
      request.method +
      request.body +
      JSON.stringify(request.headers.raw());

    const concatenatedResponse = actualResponse.body +
      JSON.stringify(actualResponse.headers.raw());

    const wholeSize = Buffer.from(concatenatedRequest + concatenatedResponse).length;

    expect(metricStorageMock.add).to.be.calledOnce();
    expect(metricStorageMock.add).to.be.calledWithExactly(requestMethod, requestUrl, wholeSize);
  });

  it('should calculate Request size', async () => {
    fetchMock.returns(Promise.resolve(new Response()));

    // Test url
    await compareRequests(
      new Request('http://short.url'),
      new Request('http://loooooooooong.url'),
    );

    // Test body
    await compareRequests(
      new Request(requestUrl, { method: 'POST', body: 'shortBody' }),
      new Request(requestUrl, { method: 'POST', body: 'loooooooooooongBody' }),
    );

    // Test headers
    await compareRequests(
      new Request(requestUrl, { headers: { header: 'shortHeader' } }),
      new Request(requestUrl, { headers: { header: 'loooooooooongHeader' } }),
    );
  });

  it('should calculate Response size', async () => {
    // Test body
    await compareResponses(
      new Response('shortBody'),
      new Response('looooooongBody'),
    );

    // Test headers
    await compareResponses(
      new Response('body', { headers: { header: 'loooooongHeader' } }),
      new Response('body', { headers: { header: 'shortHeader' } }),
    );
  });
});
