# dam-api

Services to synchronize assets from external DAMS

## Getting Started

### Prerequisites

* yarn
* docker/docker-compose
    * required if you want to run the integration tests
    * required if you want to build the docker image locally

### Installing

* yarn install

### Running the tests

From the root of the project folder from a console window to run tests

#### Unit / Integation Tests

* docker-compose up -d
* yarn run test

#### Unit / Integration Tests With Coverage

If you want coverage 

* docker-compose up -d
* yarn run testwithcover

To view the coverage report open the following

* coverage/lcov-report/index.html

#### Acceptance Cucumber Feature Tests

* docker-compose up -d
* yarn run cucumbertest

##### To Debug Cucumber Tests

* Start the application in debug mode with the build/index.js
* yarn run  cucumbertestdebug

#### Acceptance Postman Tests

* docker-compose up -d
* yarn run postmantest

#### All Tests Equivalent To CI Build

* docker-compose up -d
* yarn run build

## Editing the REST API via swagger editor

From the root of the project folder

* yarn edit

## Run Locally

From the root of the project folder

* docker-compose up -d
* yarn run transpile
* yarn start

## Deployment

Edit the circle.yml files

### Building a docker image

From the root of the project folder

* TODO

## Built With

* yarn run build

## Contributing

Elateral Ltd

## Versioning

## Authors

Elateral Ltd

## License

## Acknowledgments

