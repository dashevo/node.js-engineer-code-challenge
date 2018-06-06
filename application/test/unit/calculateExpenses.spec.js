const calculateExpenses = require('../../lib/calculateExpenses');

describe('calculateExpenses', () => {
  let p2pTrafficSize;
  let hostedTrafficSize;
  let p2pTrafficMock;
  let hostedTrafficMock;
  let elapsedMilliseconds;

  beforeEach(function beforeEach() {
    p2pTrafficSize = 2;
    hostedTrafficSize = 1;
    elapsedMilliseconds = 200;

    p2pTrafficMock = {
      getSummarySize: this.sinon.stub().returns(p2pTrafficSize),
    };
    hostedTrafficMock = {
      getSummarySize: this.sinon.stub().returns(hostedTrafficSize),
    };
  });

  it('should calculate expenses considering the traffic and elapsed time', () => {
    const expenses = calculateExpenses(p2pTrafficMock, hostedTrafficMock, elapsedMilliseconds);

    expect(p2pTrafficMock.getSummarySize).to.be.calledOnce();
    expect(hostedTrafficMock.getSummarySize).to.be.calledOnce();

    const expectedExpenses = ((p2pTrafficSize * calculateExpenses.P2P_TRAFFIC_FACTOR) +
      (hostedTrafficSize * calculateExpenses.HOSTED_TRAFFIC_FACTOR) +
      (elapsedMilliseconds * calculateExpenses.ELAPSED_TIME_FACTOR)) *
      calculateExpenses.DASH_FACTOR;

    expect(expenses).to.be.equal(expectedExpenses);
  });
});
