import { prisma } from "../../lib/prisma";

type User = { email: string; name: string };

export class UserService {
  async createUser(data: User) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async getUserAndAllPosts(userId: number) {
    const userWithPosts = await prisma.user.findUnique({
      where: { id: userId },
      include: { posts: true },
    });
    return userWithPosts;
  }
}
