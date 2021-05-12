#!/usr/bin/env node
const Nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');

try {
  let bs_local;
  process.mainModule.filename = "./node_modules/nightwatch/bin/nightwatch"
  // Code to start browserstack local before start of test
  console.log("Connecting local");
  Nightwatch.bs_local = bs_local = new browserstack.Local();
  bs_local.start({'key': process.env.BROWSERSTACK_ACCESS_KEY }, (error) => {
    if (error) throw error;

    console.log('Connected. Now testing...');
    Nightwatch.cli((argv) =>
      Nightwatch.CliRunner(argv)
        .setup(null, () => {
          // Code to stop browserstack local after end of parallel test
          bs_local.stop(() => {});
        })
        .runTests(() => {
          // Code to stop browserstack local after end of single test
          bs_local.stop(() => {});
        })
    );
  });
} catch (err) {
  console.log('There was an error while starting the test runner:\n\n');
  process.stderr.write(err.stack + '\n');
  process.exit(2);
}
