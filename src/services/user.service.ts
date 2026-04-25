import { prisma } from "../../lib/prisma";
import type { CreateUserDto } from "../dtos/user/create-user-dto";
import type { GetUsersQueryDto } from "../dtos/user/get-users-query.dto";

export class UserService {
  async createUser(data: CreateUserDto) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async getAllUsers(params?: GetUsersQueryDto) {
    const users = await prisma.user.findMany({
      where: {
        name: params?.name
          ? { contains: params.name, mode: "insensitive" }
          : undefined,
        email: params?.email
          ? { contains: params.email, mode: "insensitive" }
          : undefined,
        role: params?.role || undefined,
      },
      skip: params?.skip || 0,
      take: params?.page ? 10 : undefined,
      orderBy: { name: params?.orderBy || "desc" },
    });
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
