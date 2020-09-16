# IMTR build script

This module builds JSON configuration from json files containing IMTR XML.
The JSON output can be used to instantiate a checker client.

We use [Deno](https://deno.land) to download and convert all configuration. Tested with Deno 1.3.3.

## Install and setup

- Followed the install steps in our project level [README.md](../../README.md) if you haven't already
- [Install Deno itself](https://deno.land/#installation)
- Download the deps by running `deno run src/main.ts --unstable install`
- Optional: create a development config file, see [./src/config.local.dist.ts](./src/config.local.dist.ts)

## Usage

You can now use this script. See `deno run --unstable src/main.ts --help` for command line usage and
[CONTRIBUTING.md](../../CONTRIBUTING.md) for examples.

## Deno flags

We need some flags to make main.ts work.

- `--unstable` the deno fs package relies on unstable api's like utime and symlink
- `--allow-write` write json files
- `--allow-env` for reading STTR-builder secret key
- `--allow-read` read xml files
- `--allow-net` fetch json from rest api
