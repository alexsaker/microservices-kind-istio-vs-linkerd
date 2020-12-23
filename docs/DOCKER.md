# Docker

## Build and Push images

```bash:
docker build -t asaker/articles-service:1.0.0 --build-arg  PORT=3000 --build-arg  APP=articles-service .
docker push asaker/articles-service:1.0.0
docker build -t asaker/config-reader-service:1.0.0 --build-arg  PORT=3001 --build-arg  APP=config-reader-service .
docker push asaker/config-reader-service:1.0.0
```
