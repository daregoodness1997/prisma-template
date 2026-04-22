import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post and categories
  const create = await prisma.user.create({
    data: {
      email: "otedola@gmail.com",
      name: "Femi Otedola",
      posts: {
        create: {
          title: "How to be a trillionaire",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.",

          categories: {
            create: [{ name: "Oil" }, { name: "Gas" }],
          },
          comments: {
            create: [
              {
                content: "Great post! Very informative.",
                title: "Comment 1",
              },
            ],
          },
        },
      },
    },
  });
  const user = await prisma.user.findMany({
    include: {
      posts: {
        include: { categories: true, comments: true },
      },
    },
  });
  console.log(JSON.stringify(user, null, 2));
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
