import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post and categories

  const user = await prisma.user.create({
    data: {
      email: "ariama@prisma.io",
      name: "Ariama",
      posts: {
        create: [
          {
            title: "My second day at Prisma",
          },
          {
            title: "How to connect to a Postgres database",
            categories: {
              create: [{ name: "Database" }],
            },
          },
        ],
      },
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: {
        include: {
          categories: true,
        },
      },
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
