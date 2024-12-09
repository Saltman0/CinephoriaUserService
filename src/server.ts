import { app, logger, port } from "./app";

app.listen(port, () => {
  logger.info(`User service : Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});