# e2e-testing

## Install

Follow project install guide.
Maybe you also need to run `safaridriver --enable`. I'm not sure.

## Run the test-suite

Should work:

```
npx nightwatch test/**/*.js -e chrome
npx nightwatch test/**/*.js -e firefox
```

Doesn't work yet:

```
npx nightwatch test/**/*.js -e safari
```
