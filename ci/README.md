# Build docker image

From the git-root:

```bash
docker build -t vergunningcheck-graphql -f ci/Dockerfile.graphql .
docker run -p 4000:8080 -e DISABLE_REDIS=1 vergunningcheck-graphql
```

```bash
docker build -t vergunningcheck-client -f ci/Dockerfile.client --build-arg=REACT_APP_GRAPHQL_API_URL=http://localhost:4000/graphql .
docker run -e NAMESERVER=127.0.0.1 -p 8080:80 vergunningcheck-client
```
