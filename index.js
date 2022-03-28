import express from "express";
import routesHandler from "./routes/handler.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "./frontend/build")));

app.use(express.json());
app.use("/", routesHandler);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running.`);
});
