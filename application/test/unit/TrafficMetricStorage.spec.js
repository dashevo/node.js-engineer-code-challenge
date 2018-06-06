const TrafficMetricStorage = require('../../lib/TrafficMetricStorage');

describe('TrafficMetricStorage', () => {
  let storage;
  let measurements;

  beforeEach(() => {
    storage = new TrafficMetricStorage();
    measurements = [
      ['POST', 'http://test.url', 200],
      ['GET', 'http://test2.url', 50],
    ];
  });

  it('should add measurements and then respond all of them', () => {
    measurements.forEach(measurement => storage.add(...measurement));

    expect(storage.getAll()).to.be.deep.equal(measurements);
  });

  it('should summarize traffic size', () => {
    measurements.forEach(measurement => storage.add(...measurement));

    const expectedSize = measurements[0][2] + measurements[1][2];
    expect(storage.getSummarySize()).to.be.deep.equal(expectedSize);
  });
});
