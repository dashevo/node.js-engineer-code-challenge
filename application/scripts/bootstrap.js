/* eslint-disable no-console */
const runApplication = require('../lib/runApplication');
const renderResults = require('../lib/view/renderResults');
const renderError = require('../lib/view/renderError');

async function main() {
  try {
    const results = await runApplication();
    const output = renderResults(results);

    console.log(output);
  } catch (error) {
    const output = renderError(error);

    console.error(output);
    process.exit(1);
  }
}

main().catch(e => console.error(e));
