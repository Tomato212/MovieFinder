import express from "express";
import routesHandler from "./routes/handler.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routesHandler);

const PORTHeroku = process.env.PORT; //created for heroku routing port
const PORTLocal = 4000;
app.listen(PORTHeroku || PORTLocal, () => {
  console.log(`Server is running on port ${PORT}.`);
});
