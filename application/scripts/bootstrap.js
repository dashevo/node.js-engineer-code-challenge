/* eslint-disable no-console */
const fetch = require('node-fetch');

const runApplication = require('../lib/runApplication');
const renderResults = require('../lib/view/renderResults');
const renderError = require('../lib/view/renderError');

const storeActionFactory = require('../actions/storeActionFactory');
const fetchActionFactory = require('../actions/fetchActionFactory');

async function main() {
  try {
    // eslint-disable-next-line global-require
    const inputData = require('../data.json');

    const results = await runApplication(
      storeActionFactory,
      fetchActionFactory,
      fetch,
      inputData,
    );

    const output = renderResults(results);

    console.log(output);
  } catch (error) {
    const output = renderError(error);

    console.error(output);
    process.exit(1);
  }
}

main().catch(e => console.error(e));
