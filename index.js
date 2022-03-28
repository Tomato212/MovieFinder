import express from "express";
import routesHandler from "./routes/handler.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "../frontend/build")));

app.use(express.json());
app.use("/", routesHandler);

const PORTHeroku = process.env.PORT; //created for heroku routing port
const PORTLocal = 4000;
app.listen(PORTHeroku || PORTLocal, () => {
  console.log(`Server is running.`);
});
