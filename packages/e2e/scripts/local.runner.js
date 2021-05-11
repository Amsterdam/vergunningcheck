const Nightwatch = require("nightwatch");
const browserstack = require("browserstack-local");
let bs_local;

try {

  process.filename = "./node_modules/nightwatch/bin/nightwatch"
  // Start browserstack local before start of test
  Nightwatch.bs_local = bs_local = new browserstack.Local();
  bs_local.start({'key': process.env.BROWSERSTACK_ACCESS_KEY }, (error) => {
    if (error) throw error;

    console.log('Connected. Now testing...');
    Nightwatch.cli((argv) => {
      Nightwatch.CliRunner(argv)
        .setup(null, () => {
          // Code to stop browserstack local after end of parallel test
          bs_local.stop(() => {});
        })
        .runTests(() => {
          // Code to stop browserstack local after end of single test
          bs_local.stop(() => {});
        });
    });
  });
} catch (ex) {
  console.log('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  process.exit(2);
}
