#!/usr/bin/env node
const Nightwatch = require('nightwatch');
const browserstack = require('browserstack-local');

try {
  let bs_local;
  function stopBrowserStackLocal () {
    bs_local.stop(() => {});
  }
  process.mainModule.filename = "./node_modules/nightwatch/bin/nightwatch"
  // Code to start browserstack local before start of test
  Nightwatch.bs_local = bs_local = new browserstack.Local();
  bs_local.start({'key': process.env.BROWSERSTACK_ACCESS_KEY }, (error) => {
    if (error) throw error;

    console.log('Connected. Now testing...');
    Nightwatch.cli((argv) =>
      Nightwatch.CliRunner(argv)
        .setup(null, stopBrowserStackLocal)
        .runTests(stopBrowserStackLocal)
    );
  });
} catch (err) {
  console.error('There was an error while starting the test runner:\n\n');
  process.stderr.write(err.stack + '\n');
  process.exit(2);
}
