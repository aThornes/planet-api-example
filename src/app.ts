import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import defineRoutes from "./router";
import { initialiseDatabase } from "@handlers/databaseHandler";

dotenv.config();

const options: cors.CorsOptions = {
  origin: process.env.CORS_ORIGIN.split(" "),
  optionsSuccessStatus: 200,
};

const runServer = () => {
  /* Instantiate express application */
  const app = express();

  /* Set up CORS */
  app.use(cors(options));

  /* Use JSON middleware - tells express to expect JSON body in requests */
  app.use(express.json());

  /* Tell Express which route paths to accept requests on */
  defineRoutes(app);

  const port = process.env.SERVER_PORT;

  /* Open listener in order to recieve requests */
  const server = app.listen(port, () => {
    console.log("Server started, listening on port", port);
  });

  /* Handle unexpected shutdown to ensure listener doesn't remain open */
  process.on("SIGTERM", () => {
    server.close();
  });
};

const setup = async () => {
  await initialiseDatabase();
  runServer();
};

setup();
