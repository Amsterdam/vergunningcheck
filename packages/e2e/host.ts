function getHostFromEnv() {
  const env = process.env.HOST || "development";

  let result = "";

  if (env === "staging") {
    result = "https://ux.chappie2.com";
  } else if (env === "acceptance") {
    result = "https://acc.vergunningcheck.amsterdam.nl";
  } else if (env === "production") {
    result = "https://vergunningcheck.amsterdam.nl";
  } else {
    // defaults to development
    result = "http://localhost:3000";
  }

  return result;
}

const host = getHostFromEnv();

export = host;
