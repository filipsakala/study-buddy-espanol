import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import questionsApi from "./questionsApi";
import answersApi from "./answersApi";
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["https://espanol.sakala.me", "http://localhost:5173"],
    methods: "GET,HEAD,POST",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/question", questionsApi);
app.use("/answer", answersApi);

app.listen(port, () => {
  console.log(`Study Buddy Espanol Server started at http://localhost:${port}`); //eslint-disable-line no-console
});
