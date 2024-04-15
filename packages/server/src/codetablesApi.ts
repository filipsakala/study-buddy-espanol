import express from "express";
import getCodetables from "./codetables";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const codetables = await getCodetables();

    res.status(200).json(codetables);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errorMessage: "General server error while loading codetables" });
  }
});

export default router;
