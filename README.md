# Vergunningcheck

This application is the permit checker [`vergunningcheck`] for Gemeente Amsterdam. This repo contains 2 apps, `client` and `graphql`. We use Lerna under the hood to install deps and run on both apps. But you can also run and configure then individually.

# Project information:

This application allows residents of Amsterdam to easily see if they need a permit for a construction activity for their specific building. For various activities, like installing a window or solar panels on the roof or extending the house, we ask a number of questions about the location and plans. This leads to an outcome, either license-free or licensing obligation, where it is clear which questions lead to this conclusion. This tool can therefore be used to see how in a specific location you could carry out a construction activity without the requirement of a permit.

## Install / run

```bash
npm i
npm start
```

## Releasing

Starting from the `master` branch, follow these steps

- `git merge develop`
- update the [CHANGELOG](CHANGELOG.md) and commit that too
- `./node_modules/.bin/lerna publish`

You have to approve the release in Jenkins.

On `develop` run `git merge master`

## Tech stack

- React
- React Hook Form
- GraphQL + Apollo
- Lerna
- [Amsterdam Styled Components](https://github.com/Amsterdam/amsterdam-styled-components/)
- [Matomo Tracker React](https://github.com/Amsterdam/matomo-tracker)
- Prettier
- Jest + Testing Library

## Known issues

- css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)

## Thanks to

[<img src="https://github.com/Amsterdam/atlas/blob/develop/public/images/browserstack-logo@2x.png" height="60" title="BrowserStack Logo" alt="BrowserStack Logo" />](https://www.browserstack.com/)
