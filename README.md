# Student Financial Aid

## Public portal for SFA

## Development

1. Boot the database via

```bash
docker compose -f ./docker-compose.dev.yaml up
```

TODO: figure out what environment variables go where, and in which files.

2. Boot the back-end via

```bash
cd ./src/api
npm install
npm run start
```

3. Boot the front-end via

```bash
cd ./src/web
npm install
npm run start
```
