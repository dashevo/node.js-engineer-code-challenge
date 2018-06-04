/**
 * Create fetchAction with dependencies
 *
 * @param {function} p2pFetch
 * @param {function} hostedFetch
 * @return {fetchAction}
 */
// eslint-disable-next-line no-unused-vars
module.exports = function storeActionFactory(p2pFetch, hostedFetch) {
  /**
   * Fetch and verify data
   *
   * @typedef fetchAction
   * @return {object[]} Verified data
   */
  async function fetchAction() {
    // Your code should be here
  }

  return fetchAction;
};
