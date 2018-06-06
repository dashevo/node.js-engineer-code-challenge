const { Request } = require('node-fetch');

/**
 * Create compareResponses with dependencies
 *
 * @param {measureTraffic} measureTraffic
 * @param {TrafficMetricStorage} metricStorageMock
 * @param {fetch} fetchMock
 * @return {compareRequests}
 */
module.exports = function compareResponsesFactory(measureTraffic, metricStorageMock, fetchMock) {
  /**
   * Compare sizes of two Responses
   *
   * @typedef compareResponses
   * @param {fetch.Response} firstResponse
   * @param {fetch.Response} secondResponse
   * @return {Promise<void>}
   */
  async function compareResponses(firstResponse, secondResponse) {
    const request = new Request();

    fetchMock.returns(Promise.resolve(firstResponse));

    await measureTraffic(request);

    fetchMock.returns(Promise.resolve(secondResponse));

    await measureTraffic(request);

    expect(metricStorageMock.add).to.be.calledTwice();

    const firstCallSize = metricStorageMock.add.firstCall.args[2];
    const secondCallSize = metricStorageMock.add.secondCall.args[2];

    expect(firstCallSize).not.to.be.equal(secondCallSize);

    metricStorageMock.add.reset();
  }

  return compareResponses;
};
