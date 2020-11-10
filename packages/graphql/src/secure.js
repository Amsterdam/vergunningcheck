const helmet = require("helmet");
const featurePolicy = require("feature-policy");
const config = require("../config");

module.exports = (app) => {
  app.use(
    featurePolicy({
      features: {
        geolocation: ["'none'"],
        camera: ["'none'"],
      },
    })
  );
  app.use(
    helmet({
      contentSecurityPolicy: config.enableContentSecurityPolicy && {
        // based on pen-test findings we enable csp for our app even if we don't serve any html pages.
        directives: {
          // most strict settings possible
          defaultSrc: ["'none'"],
        },
      },
      frameguard: {
        action: "deny",
      },
      expectCt: {
        // based on pen-test; enable expect-ct. Values taken from parent site.
        enforce: false,
        maxAge: 0, // 604800 is used on parent site
        reportUri: "https://report-uri.cloudflare.com/cdn-cgi/beacon/expect-ct",
      },
      permittedCrossDomainPolicies: "all",
      referrerPolicy: { policy: "no-referrer" },
    })
  );

  return app;
};
