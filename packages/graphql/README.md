# Install / run

```bash
npm i
npm start
```

# Database setup

If you want to use the actual db instead of mock-data you can set
`DATAPUNT_DB_ENABLED=true` in `.env`. Make sure you also configure the
database credentials and setup a VPN connection.

# Known issues

For some reason (zip it and ship it?) this does not work on Netlify:

```
require("lodash.something")
```

Therefore we include the entire lodash lib (for now).
