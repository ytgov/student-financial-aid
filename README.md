# Student Financial Aid

## Public portal for SFA

## Development

1. Set up local environment variables via `direnv`. Create a `.envrc` file with

```bash
export MSSQL_SA_PASSWORD=DifficultPassword123!

export DB_USER=sa
export DB_PASS=MSSQL_SA_PASSWORD
export DB_NAME=sfa
```

Then run `direnv allow`

2. Rename the `db/sapassword.env.sample` file to `db/sapassword.env`

3. Create a blank `db/setup.sql` file.

4. TODO: Do something with with the `.env.sample` file. Probably copy it into both `src/api` and `src/web` as `.env` and fill in all the values?

TODO: figure out what environment variables go where, and in which files.

5. Boot the database via

```bash
docker compose -f ./docker-compose.dev.yaml up
```

6. Boot the back-end via

```bash
cd ./src/api
npm install
npm run start
```

7. Boot the front-end via

```bash
cd ./src/web
npm install
npm run start
```

### Development with `sfa-client` back-end

1. Clone the `sfa-client` repo into the same root directory as this project via `git clone git@github.com:icefoganalytics/sfa-client.git`

   Directory structure should look like: - my-organization - sfa-client - student-financial-aid

2. Boot the `sfa-client` back-end using `cd ./sfa-client && API_PORT=3100 dev up` in its repo.

3. In a new tab, from the `my-originalization` directory, boot the `sfa-client` api service via `cd ./student-financial-aid/src/api && npm run start`

4. In a new tab, from the `my-originalization` directory, boot the `sfa-client` web service via `cd ./student-financial-aid/src/web && npm run start`
