# Contributing

Thanks for considering to contribute to this project. Please follow the below guidelines before you
open up a pull request. See [README.md](README.md) for nomenclature.

## Commiting

We use [Conventional Commits](https://www.conventionalcommits.org).

## Styled Components

We use [Amsterdam Styled Components](https://github.com/Amsterdam/amsterdam-styled-components/), see [Storybook](https://amsterdam.github.io/amsterdam-styled-components) which is an implementation of the [Amsterdam Design System](https://designsystem.amsterdam.nl).

Example usage of the `Alert` component:

```js
import { Alert } from "@amsterdam/asc-ui";

...

<Alert content="content" heading="heading">
```

## Styling usage of margin and padding

Amsterdam uses a 4px grid, so all distances should be divided by 4. You can use the `themeSpacing` function from Amsterdam Styled Components for this.

Example usage:

```scss
padding-top: ${themeSpacing(1)}; // This will have a padding of 1 * 4 = 4px
padding-right: ${themeSpacing(2)}; // This will have a padding of 2 * 4 = 8px
padding-bottom: ${themeSpacing(3)}; // This will have a padding of 3 * 4 = 12px
padding-left: ${themeSpacing(4)}; // This will have a padding of 4 * 4 = 16px
```

To simplify things you can also use:

```scss
margin: ${themeSpacing(5, 0, 4)}; // margin: 20px 0 16px;
```

## (un-)install npm package

Because we use Lerna, unfortunately we can't safely use `npm` in one of the lerna-managed
packages. This is not a bug. Therefore we need to do a little additional work.

To add an npm-package to one of our managed lerna-packages, run:

```
lerna add cowsay --scope=@vergunningcheck/client
```

To remove a package, remove the dependency from the package.json manually, then;

```
lerna clean -y
lerna bootstrap
```

## Link lerna packages

If you want to install one package from `./packages/` into another, you can use lerna to link them.
Ie. if you want to install `mocking` into `graphql`, run:

```
lerna add @vergunningcheck/mocking --scope=graphql
```

TODO find alternative to:

```
rm `find . -name package-lock.json | grep -v node_m`
rm -rf node_modules packages/*/node_modules
npm i
```

## Updating permits

If you want to use the latest permit-configuration (XML files from the sttr-builder) follow these steps.

- Follow the install steps in [./packages/imtr/README.md](./packages/imtr/README.md)
- Make sure you have the api-key in your environment variables. `export STTR_BUILDER_API_KEY=somesecret`
- Download the xml files and transform them to our json-format from `npm run imtr`
- Thats it. Fire up the app with `npm start` if you hadn't already. You can now test your new or updated permit.

## Combine permits into one topic

If you want to combine 2 or more permits in 1 checker, we need to configure a topic in our imtr-build config.

- Follow the install steps in [./packages/imtr/README.md](./scripts/sttimtrr_build/README.md)
- First make sure you update your permits so we have all the files we need. See the section above.
- List the permit-id's you want to combine in [./packages/imtr/src/config.ts](./packages/imtr/src/config.ts) under `topics`.
  - To find the permit-ids you can use in the `./packages/client/public/imtr/list.source.json`.
  - You have to give your topic a slug as the key. This slug is used in the url by the client-application.
- Then run `npm run imtr`.
- Open the app, your checker should be visible in the list.

A short note about combining permits. Often multiple permits in one checker include the same questions, eg. the monument-status question. We don't want to ask the same question twice so we dedupe them. Make sure the `herbruikbaarId` field is the same in the IMTR files. We use the key `uuid` in the `Question` model.

## Configure a topic in the client-app

If you want to tweak texts, the name or the intro of a checker, you need to add some configuration in the client-application.

- Open [config/index.ts](packages/client/src/config/index.ts) in your editor of choice
- Create a new `Topic` and fill in the attributes accordingly
- Duplicate an existing Intro component file in `packages/client/src/intros`, change the content to your wishes and name it **exactly** as you named it in the previous step `intro`

## Preparing a UX test

When we want to test our app with users we most follow this procedure:

- Create new branch from the base branch and name it `ux-test-${topic}` where `${topic}` is the topic name and check this out locally
- In `./packages/client` run `npm run gererate` to get the latest IMTR files and transform them to json
- Edit the `topic` array in [config/index.ts](packages/client/src/config/index.ts) and make sure you added the correct config.
- Push these changes to GitHub
- Goto _Domain settings_ on Netlify and add a new SubDomain for your `ux-test-${topic}` branch
- Verify everything is working correctly and share this link with your colleages

## Release

### Prepare a release, deploy to acceptance

Basically what we want to do is merge `develop` with `release` including the latest IMTR-changes. We use lerna-changelog to generate our changes we can use in [CHANGELOG.md](CHANGELOG.md), so you'll need a [personal access token](https://github.com/settings/tokens) for the GitHub API with the public_repo scope for public repositories.
Make sure you are logged in by npm command line. If not, log in with `npm adduser`. Add `export GITHUB_AUTH=...` to your profile (eg: `.zshrc`).

- Run `npm run prepare-release` to back-merge and generate new IMTR-files
- Commit changes if needed
- Push these changes (to origin/develop)
- Run `npm run release` to merge `develop` with `release` and push it.
- The application will be build by [Jenkins](https://ci.data.amsterdam.nl/job/OIS/job/vergunningcheck/job/release/) and deployed to acceptance
- Verify the `release` branch is on acceptance and it's the latest build
- Consider running `npm run back-merge` if you made any changes
- Communicate to stakeholders there is a new release testable on acceptance

### Create the release PR

- Run `npm run changelog`, a changelog will be generated
- Paste the changelog to the [CHANGELOG.md](CHANGELOG.md), determine the version number and replace "Unreleased " with the new version, so it looks like this: `[2.0.0](2020-09-02)`
- Verify if all changes planned for this release are in the changelog, update Trello card if something was missing
- Create [a diff](https://github.com/Amsterdam/vergunningcheck/compare/master...release) from release to master on GitHub and do a quick-scan to see if nothing is missing from the changelog
- Commit the changelog (after verifying nothing is missing)
- Run `npm run publish` to add and publish a release tag. It's pushed to the repo.
- Create [the PR](https://github.com/Amsterdam/vergunningcheck/compare/master...release)
- Assign the PR to your team members

### Create artifact and deploy to acceptance

- Walk through the PR and verify the release branch is on acceptance (by looking at the App Version)
- Merge the pr, don't use Squash and Merge
- [Jenkins](https://ci.data.amsterdam.nl/job/OIS/job/vergunningcheck/job/master/) will create the artifact (docker images) based on the master branch
- Check if the build succeeded and verify the version number and branch on acceptance

### Deploy to production

This procedure will be changed to the DRAFT section below.

- Approve the release to production in [Jenkins](https://ci.data.amsterdam.nl/job/OIS/job/vergunningcheck/job/master/), now we're live
- Communicate to stakeholders there is a new release on production
- Back-merge `master` into `release` into `develop` by running `npm run back-merge`
- Consider [preparing](#prepare-a-release) the next release in the section above

### (DRAFT) Deploy to production

- Run the deploy job in Jenkins
- Select the artifact (that was deployed to acceptance) you want to release

### (DRAFT) Rollback

You can use the same procedure as deploying, just select a different artifact.
