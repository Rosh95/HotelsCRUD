import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { initDataSource } from "./database/dataSource";
import dotenv from "dotenv";

dotenv.config();

console.log(`DATA_URL from .env: ${process.env.DATA_URL}`); // Отладочный вывод

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", userRoutes);

initDataSource()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
