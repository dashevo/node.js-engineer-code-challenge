const { Response } = require('node-fetch');

/**
 * Create compareRequests with dependencies
 *
 * @param {measureTraffic} measureTraffic
 * @param {TrafficMetricStorage} metricStorageMock
 * @param {fetch} fetchMock
 * @return {compareRequests}
 */
module.exports = function compareRequestsFactory(measureTraffic, metricStorageMock, fetchMock) {
  /**
   * Compare sizes of two Requests
   *
   * @typedef compareRequests
   * @param {fetch.Request} firstRequest
   * @param {fetch.Request} secondRequest
   * @return {Promise<void>}
   */
  async function compareRequests(firstRequest, secondRequest) {
    fetchMock.returns(Promise.resolve(new Response('test')));

    await measureTraffic(firstRequest);

    fetchMock.returns(Promise.resolve(new Response('test')));

    await measureTraffic(secondRequest);

    expect(metricStorageMock.add).to.be.calledTwice();

    const firstCallSize = metricStorageMock.add.firstCall.args[2];
    const secondCallSize = metricStorageMock.add.secondCall.args[2];

    expect(firstCallSize).not.to.be.equal(secondCallSize);

    metricStorageMock.add.reset();
  }

  return compareRequests;
};
