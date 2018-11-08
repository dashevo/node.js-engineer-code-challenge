/**
 * Storage for traffic size metric
 */
class TrafficMetricStorage {
  constructor() {
    this.data = [];
  }

  /**
   * Add metric
   *
   * @param fields
   */
  add(...fields) {
    this.data.push([...fields]);
  }

  /**
   * Get all metrics
   * @return {array[]}
   */
  getAll() {
    return this.data;
  }

  /**
   * Get summary size
   * @return {number}
   */
  getSummarySize() {
    return this.data.reduce((summarySize, [,, size]) => summarySize + size, 0);
  }
}

module.exports = TrafficMetricStorage;
