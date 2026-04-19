import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  /**
   * The constructor initializes a new instance of the UserService class.
   */
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: any, res: any) {
    try {
      const { email, name } = req.body;
      const user = await this.userService.createUser({ email, name });
      res.status(201).json(user);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to create user: " + error.message });
    }
  }

  async getAllUsers(req: any, res: any) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Failed to fetch users: " + error.message });
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
}
