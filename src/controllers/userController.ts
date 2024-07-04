import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { User } from "../entity/User";

const userService = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userService.getUserById(Number(id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, age } = req.body;
  const newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.age = age;

  const user = await userService.createUser(newUser);
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const user = await userService.updateUser(Number(id), {
    name,
    email,
    age,
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = Number(id);
  const user = await userService.getUserById(userId);
  if (user) {
    await userService.deleteUser(userId);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
