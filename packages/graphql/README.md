# Install / run

```bash
npm i
npm start
```

# Known issues

For some reason (zip it and ship it?) this does not work on Netlify:

```
require("lodash.something")
```

Therefore we include the entire lodash lib (for now).
