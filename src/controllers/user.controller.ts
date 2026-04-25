import { Request, Response } from "express";
import { CreateUserSchema } from "../dtos/user/create-user-dto";
import { UserService } from "../services/user.service";
import { GetUsersQuerySchema } from "../dtos/user/get-users-query.dto";
import { UserResponseSchema } from "../dtos/user/user-response.dto";
import { ZodError } from "zod";

export class UserController {
  private userService: UserService;

  /**
   * The constructor initializes a new instance of the UserService class.
   */
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response) {
    try {
      const data = CreateUserSchema.parse(req.body);
      const user = await this.userService.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.issues });
        return;
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const query = GetUsersQuerySchema.parse(req.query);
      const users = await this.userService.getAllUsers(query);
      res.status(200).json(users.map((user) => UserResponseSchema.parse(user)));
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.issues });
        return;
      }
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async getUserByEmail(req: any, res: any) {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch user: " + error.message });
    }
  }

  async getUserAndAllPosts(req: any, res: any) {
    try {
      const { userId } = req.params;
      const userWithPosts = await this.userService.getUserAndAllPosts(
        Number(userId),
      );
      if (userWithPosts) {
        res.status(200).json(userWithPosts);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to fetch users: " + error.message });
    }
  }
}
