const { Request } = require('node-fetch');

/**
 * Calculate request size
 *
 * @private
 * @param {fetch.Request|Request} request
 * @return {number}
 */
function calculateRequestSize(request) {
  let concatenatedRequest = request.url +
    request.method +
    JSON.stringify(request.headers.raw());

  if (request.method !== 'HEAD' || request.method !== 'GET') {
    concatenatedRequest += request.body;
  }

  return Buffer.from(concatenatedRequest).length;
}

/**
 * Calculate response size
 *
 * @private
 * @param {Response} response
 * @return {number}
 */
function calculateResponseSize(response) {
  const concatenatedResponse = response.body +
    JSON.stringify(response.headers.raw());

  return Buffer.from(concatenatedResponse).length;
}

/**
 * Create measureTraffic with dependencies
 *
 * @param {fetch} fetch Whatwg fetch
 * @param {TrafficMetricStorage} metricStorage
 * @returns {fetch|measureTraffic}
 */
module.exports = function measureTrafficFactory(fetch, metricStorage) {
  /**
   * Wrap whatwg fetch and measure traffic
   *
   * @typedef measureTraffic
   * @param {string|fetch.Request} input Fetch url or Request object
   * @param {object} [init] Fetch options
   * @returns {Promise<Response>}
   */
  async function measureTraffic(input, init = undefined) {
    const request = new Request(input, init);

    const response = await fetch(request);

    const wholeSize = calculateRequestSize(request) +
      calculateResponseSize(response);

    metricStorage.add(
      request.method,
      request.url,
      wholeSize,
    );

    return response;
  }

  return measureTraffic;
};
