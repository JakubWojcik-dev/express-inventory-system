### express inventory API

```
Inventory API written with express.js framework and MongoDB for data storage.

```

## Run project with docker

```
To build and run project with Docker run command: 'docker-compose up --build'

To run project: 'docker-compose up -d'

To check container logs: 'docker-compose logs -f'

To stop cointainers: 'docker-compose down'
```

## Run api locally

```
To build packages locally run command: 'npm install'

To run project after instaling packages: 'npm run local'

```

## Documentation

Documentation was generated using swagger tool.

To check API request documentation and test request run [text](http://localhost:3000/documentation/)

```

## Code guide

```

Node version 20.
Build project with Docker
.env file is required and should be placed into root folder.

```

## .ENV file schema

```

PORT=
DATABASE_DOCKER_URL=
DATABASE_LOCAL_URL=
DATABASE_NAME=
PRODUCTS_COLLECTION_NAME=
ORDERS_COLLECTION_NAME=
DB_VOLUME=
DB_PORT=
APP_PORT=
DB_USER=
DB_PASSWORD=
DB=

```

```
