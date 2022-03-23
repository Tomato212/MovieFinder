import express from "express";
import routesHandler from "./routes/handler.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routesHandler);

const PORT = 4000; //backend routing port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
