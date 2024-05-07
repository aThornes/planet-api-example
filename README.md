# Example API - Planet store

API built around storing information on celestial bodies such as planets. Can be expanded as needed.

All endpoints are as described in docs/apiDocs.yaml

Includes partial jest tests, see examples with the suffix .test.ts. These should be expanded as an excerise to improve coverage.

## Scripts

`yarn dev` - Builds and runs the server for local development

`yarn createRoute` - Creates the files for a new development endpoint

`yarn build`- Runs the build script which ensures application routes are up to date

## Dependencies

`node` - Node is required in order to build and run this application. Built with v18.17.0 but should work on later versions. To manage versions, the `nvm` package is recommended.

`yarn` - Yarn is a package manager used to install all packages. Npm is sufficient but will cause complaints having two types of lock file

`MongoDB` - Requires an active database mongodb instance, this was developed with MongoDB Atlas for which just a valid connection string and user/pass details must be provided in .env
