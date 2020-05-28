# Vergunningcheck

This application allows residents of Amsterdam to easily see if they need a permit for a construction activity for their specific building. For various activities, like installing a window or solar panels on the roof or extending the house, we ask a number of questions about the location and plans. This leads to an outcome, either license-free or licensing obligation, where it is clear which questions lead to this conclusion. This tool can therefore be used to see how in a specific location you could carry out a construction activity without the requirement of a permit.

## Install / run

This repo contains 2 apps, `client` and `graphql`. We use Lerna under the hood to install deps and run on both apps. But you can also run and configure then individually.

```bash
npm i
npm start
```

## Contributing

If you want to contribute to this project please read [CONTRIBUTING.md](CONTRIBUTING.md)

## Releasing

We use lerna-changelog to automatically generate our [CHANGELOG.md](CHANGELOG.md), so you'll need a [personal access token](https://github.com/settings/tokens) for the GitHub API with the public_repo scope for public repositories.

Add `export GITHUB_AUTH=...` to your profile (eg: `.zshrc`).

- Run `npm run release`.
- Create [a new PR](https://github.com/Amsterdam/vergunningcheck/compare/master...develop) from develop to master on GitHub
- After the merge and deploy, verify the changes on ACC.
- After verify you have to approve the deploy to production in Jenkins.

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
- we are not on the latest version of `react-scripts` because 3.4.1 does not play well with Lerna. See https://github.com/facebook/create-react-app/issues/8685

## Thanks to

[<img src="https://github.com/Amsterdam/atlas/blob/develop/public/images/browserstack-logo@2x.png" height="60" title="BrowserStack Logo" alt="BrowserStack Logo" />](https://www.browserstack.com/)
