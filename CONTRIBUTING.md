## Commiting

We use [Conventional Commits](https://www.conventionalcommits.org).

_Text to be extended..._

## Adding a new topic with permits

Follow these steps if you want to add a new topic:

__Note: some parts will be changed when we add the new logic, but as of august 1st 2020 this is the way to go:__

- Open [config/index.ts](apps/client/src/config/index.ts) in your editor of choice
- Duplicate an existing object under `const topics` and edit these values: `slug`, `sttrFile`, `text` and `intro`
  - `slug` = The part of our app URL that identifies which permit-check to load (`dakraam-plaatsen` will be `https://vergunningcheck.amsterdam.nl/dakraam-plaatsen`)
  - `sttrFile` = The name of the (JSON :roll_eyes: ) file that holds all the question and route logic. An actual STTR file (XML :roll_eyes: ) is parsed and changed into JSON to be accessed more easily. 
  - `text` = This is part that holds specific texts for each permit-check
  - `intro` = The name of the component that has all texts on the Intro page (
- Duplicate an existing Intro component file in `apps/client/src/intros`, change the content to your wishes and name it **exactly** as you named it in the previous step `intro`


@Andre, can you add the new steps how to generate a matching JSON file to the `sttrFile` key?

_Text to be extended..._

## Preparing a UX test

When we want to test our app with users we most follow this procedure:

- Create new branch from the base branch and name it `ux-test-${topic}` where `${topic}` is the topic name and check this out locally
- Run `STTR_ENV=production lerna run sttr` to get the latest STTR files 
- Edit the `topic` array in [config/index.ts](apps/client/src/config/index.ts) and make sure you added the correct `sttrFile`
- Push these changes to GitHub
- Goto [domain settings ](https://app.netlify.com/sites/vergunningcheck/settings/domain) on Netlify and add a new SubDomain for your `ux-test-${topic}` branch
- Verify everything is working correctly and share this link with your colleages 
