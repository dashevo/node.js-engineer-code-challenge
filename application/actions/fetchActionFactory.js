/**
 * Create fetchAction with dependencies
 *
 * @param {fetch} p2pFetch
 * @param {fetch} hostedFetch
 * @return {fetchAction}
 */
// eslint-disable-next-line no-unused-vars
module.exports = function fetchActionFactory(p2pFetch, hostedFetch) {
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
