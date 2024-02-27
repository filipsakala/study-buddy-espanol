import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Multimedia Manager Server started at http://localhost:${port}`); //eslint-disable-line no-console
});
