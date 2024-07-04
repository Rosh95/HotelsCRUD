import { UserRepository } from "../repository/userRepository";
import { User } from "../entity/User";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.getUserById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
