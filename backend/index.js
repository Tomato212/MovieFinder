import express from "express";
import bodyParser from "body-parser";
import routesHandler from "./routes/handler.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", routesHandler);

const PORT = 4000; //backend routing port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
