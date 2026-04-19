import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env["DATABASE_URL"] as string;

export const prisma = new PrismaClient({
  adapter: new PrismaPg(connectionString),
});
