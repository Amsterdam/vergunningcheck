# Usage

Please note you have to set STTR_BUILDER_API_KEY in your environment variables.

```
npm i

node test-api.js https://sttr-builder.eu.meteorapp.com/api/v2/indieningsvereisten/sttr post NJNrciBQefahC2Fgt > test.xml

../../packages/imtr/xml2json test.xml > test.json

ts-node test-client.ts test.json > ../../packages/client/public/imtr/transformed/form.json

```
