# demo

Demo REST service created with Node.js and Express.

## Endpoints

- `GET /`: Service information and endpoints list
- `GET /api/health`: Health status and uptime
- `GET /api/hello?name=<value>`: Hello response with query name
- `GET /api/items`: Returns demo items list
- `POST /api/items`: Adds a new item (`name`, `description`)

## Environment Variables

- `APP_PASSWORD`: Required. Application secret password to start the service.

## Quickstart

Run via Docker:

```sh
docker build -t demo:latest .
docker run -d -p 3000:3000 -e APP_PASSWORD=demosecret123 --name demo-api demo:latest
```

Or run directly with Node:

```sh
npm install
APP_PASSWORD=demosecret123 npm start
```

## GitHub Actions

Image publishing is triggered manually under the repository's **Actions** tab by choosing **Manual Docker Build and Push** and clicking **Run workflow**.
