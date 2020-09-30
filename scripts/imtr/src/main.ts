import yargs from 'https://deno.land/x/yargs@v16.0.3-deno/deno.ts';
import type { YargsType } from 'https://deno.land/x/yargs@v16.0.3-deno/types.ts';

import { default as transform } from './transform.ts';
import { default as fetch } from './fetch.ts';

yargs()
  .usage('Usage: $0 command [options]')
  .command('fetch', 'Fetch the imtr files', (args: YargsType) => {
    return args
      .usage('Usage: fetch --dir=../some/path')
      .demandOption(['dir'])
      .positional('dir', {
        describe: 'Output directory',
      })
      .option('config', {
        describe: 'Path to the config file',
      })
      .option('max-connections', {
        description: 'Maximum connections to use',
        type: 'number',
        default: 1,
      })
  }, fetch)

  // TODO find alternative for:
  // prettier --write ../client/public/*/**/*.json ../client/src/topics.json
  .command('transform', 'Transform the imtr files', (args: YargsType) => {
    return args
      .usage('Usage: transform --dir=../some/path')
      .demandOption(['dir'])
      .option('dir', {
        describe: 'Output directory',
      })
      .option('config', {
        describe: 'Path to the config file',
      })
  }, transform)

  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args)
