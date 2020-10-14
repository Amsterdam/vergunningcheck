# Vergunningcheck [![codecov](https://codecov.io/gh/Amsterdam/vergunningcheck/branch/develop/graph/badge.svg)](https://codecov.io/gh/Amsterdam/vergunningcheck) [![Github CI](https://github.com/Amsterdam/vergunningcheck/workflows/Github%20CI/badge.svg)](https://github.com/Amsterdam/vergunningcheck/actions)

This application allows residents of Amsterdam to easily see if they need a permit for a construction activity for their specific building. For various activities, like installing a window or solar panels on the roof or extending the house, we ask a number of questions about the location and plans. This leads to an outcome, either license-free or licensing obligation, where it is clear which questions lead to this conclusion. This tool can therefore be used to see how in a specific location you could carry out a construction activity without the requirement of a permit.

## Install / run

This repo contains 5 packages, `client`, `graphql`, `imtr`, `mocking` and `e2e`. We use Lerna under the hood to install deps and run on all packages. But you can also run and configure then individually.

```bash
npm i
npm start
```

If you need to update the checks there are additional install steps in [packages/imtr/README.md](packages/imtr/README.md).

## Contributing

If you want to contribute to this project please read [CONTRIBUTING.md](CONTRIBUTING.md)

## Tech stack

- React
- React Hook Form
- [Deno](https://deno.land)
- GraphQL + ApolloClient
- Lerna
- Sentry
- [Amsterdam Styled Components](https://github.com/Amsterdam/amsterdam-styled-components/), see [Storybook](https://amsterdam.github.io/amsterdam-styled-components) which is an implementation of the [Amsterdam Design System](https://designsystem.amsterdam.nl)
- [Matomo Tracker React](https://github.com/Amsterdam/matomo-tracker)
- Prettier
- Jest + Testing Library

## Nomenclature

First a brief intro on some of the terminology and concepts we use, to make sure the steps below make sense.

- permit, ('vergunning' in dutch). You might need a permit for an activity (activiteit).
- topic, a type of doing (werkzaamheid in dutch). Could be multiple activities / permits in one topic. It corresponds with a configured checker with one or more permits.
- STTR; STTR is a spec dutch DSO legislation
- IMTR-file; IMTR is an XML standard for dutch DSO legislation
- xml to json; we convert IMTR-XML to JSON for better performance
- STTR-builder; the tool used to build IMTR-files
- check; the activity of checking whether you need a permit (see permit)
- visitor; the person performing a check
- checker; the tool itself (including an intro page, register lookups, a set of questions and a conclusion)

## Known issues

- css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)
- we are not on the latest version of `react-scripts` because 3.4.1 does not play well with Lerna. See https://github.com/facebook/create-react-app/issues/8685

## Thanks to

[<img src="https://github.com/Amsterdam/atlas/blob/develop/public/images/browserstack-logo@2x.png" height="60" title="BrowserStack Logo" alt="BrowserStack Logo" />](https://www.browserstack.com/)
