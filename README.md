# vergunningcheck

Chappie is the permit checker for Gemeente Amsterdam.
This repo contains 2 apps, `client` and `graphql`.
We use Lerna under the hood to install deps and run on both apps.
But you can also run and configure then individually.

## Install / run

```bash
npm i
npm start
```

## Known issues

- css sourcemaps (some issues exist in development, in prod it works, see https://github.com/facebook/create-react-app/issues/6399)
