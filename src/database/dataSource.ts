import { DataSource } from "typeorm";
import { User } from "../entity/User";
import dotenv from "dotenv";
dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATA_URL,
  synchronize: true,
  entities: [User],
});

export const initDataSource = async () => {
  await AppDataSource.initialize();
  console.log("Database connected and initialized");
};

initDataSource().catch((error) => {
  console.log("Database connection error:", error);
});

export default AppDataSource;
