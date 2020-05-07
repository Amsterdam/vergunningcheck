# Build docker image

From the git-root:

```bash
docker build -t vergunningcheck-graphql -f ci/Dockerfile.graphql .
docker run vergunningcheck-graphql
```
