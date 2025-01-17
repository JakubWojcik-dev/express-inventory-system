import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
