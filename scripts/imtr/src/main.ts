import yargs from 'https://deno.land/x/yargs@v16.0.3-deno/deno.ts';
import { YargsType } from 'https://deno.land/x/yargs@v16.0.3-deno/types.ts';

import { default as transform } from './transform.ts';
import { default as fetch } from './fetch.ts';

// fetch({
//   dir: '../../apps/client',
//   config: 'src/config.ts',
//   maxConnections: 6
// });

yargs()
  .usage('Usage: $0 command [options]')
  // .command('install', 'Install deps', async () => {
  //   await Deno.run({
  //     cmd: ["deno", "cache", "--reload", "--lock=lock.json", "src/deps.ts"],
  //   }).status();
  // })
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
        default: 6,
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

  // .command('test', 'Run the tests', async () => {
  //   await Deno.run({
  //     cmd: ["deno", "test", "--allow-read"],
  //   }).status();
  // })

  // .command('reload', 'Reload deps', async () => {
  //   await Deno.run({
  //     cmd: ["deno", "cache", "--reload", "src/deps.ts"],
  //   }).status();
  //   await Deno.run({
  //     cmd: ["deno", "cache", "--unstable", "src/deps.ts", "--lock=lock.json", "--lock-write"],
  //   }).status();
  //   // ... test
  // })
  .strictCommands()
  .demandCommand(1)
  .parse(Deno.args)
