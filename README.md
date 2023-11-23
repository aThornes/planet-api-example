# Example API - Planet store

API built around storing information on planets. Can be expanded as needed

Includes partial jest tests, see examples with the suffix .test.ts. These should be expanded as an excerise to improve coverage.

## Dependencies

[Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Running

Install packages (one time or when packages updated)
`yarn install`

Run application

1. `yarn build`
2. `yarn start`

   OR

- `yarn dev`

# Postman

When the application is running, if configuration is unchanges, the server will run on port 8080 (as defined in .env). In order to send requests to the API, postman is recommended for testing.

[Postman](https://www.postman.com/)

Note: You do not need an account, you can download the software and use straight away.

## Import JSON

You will find a file called Postman_Examples.json. Within postman you can import this file, see the button on the left hand side towards the top of the UI.

There are examples here for each of the endpoints present. As you create new endpoints you should add to this in order to ensure they work as expected. Jest testing will only get you so far, you should perform integration tests as well to ensure correct functionality.

# Potential Tasks

1. Write jest tests to improve coverage
2. Implement schema checking
3. Schema documentation [Swagger/OpenAPI](https://swagger.io/specification/)
4. Add a new classification to the data store, e.g comets (will require some renaming)
5. Update index to support new classification
6. Add a new endpoint route, e.g. Edit functionality
