/**
 * Create compareRequests with dependencies
 *
 * @param {measureTraffic} measureTraffic
 * @param {TrafficMetricStorage} metricStorageMock
 * @return {compareRequests}
 */
module.exports = function compareRequestsFactory(measureTraffic, metricStorageMock) {
  /**
   * Compare sizes of two Requests
   *
   * @typedef compareRequests
   * @param {fetch.Request} firstRequest
   * @param {fetch.Request} secondRequest
   * @return {Promise<void>}
   */
  async function compareRequests(firstRequest, secondRequest) {
    await measureTraffic(firstRequest);
    await measureTraffic(secondRequest);

    expect(metricStorageMock.add).to.be.calledTwice();

    const firstCallSize = metricStorageMock.add.firstCall.args[2];
    const secondCallSize = metricStorageMock.add.secondCall.args[2];

    expect(firstCallSize).not.to.be.equal(secondCallSize);

    metricStorageMock.add.reset();
  }

  return compareRequests;
};
