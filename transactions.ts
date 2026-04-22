import { prisma } from "./lib/prisma";

// Sequential transactions

await prisma.account.createMany({
  data: [
    {
      balance: 1000,
      userId: 1,
    },
    {
      balance: 500,
      userId: 2,
    },
  ],
  skipDuplicates: true,
});

const [posts, totalPosts, users, totalUsers] = await prisma.$transaction([
  prisma.post.findMany(),
  prisma.post.count(),
  prisma.user.findMany(),
  prisma.user.count(),
]);

console.log({ posts, totalPosts, users, totalUsers });

const sendMoney = async (
  fromUserId: number,
  toUserId: number,
  amount: number,
) => {
  // We want to send money from one user to another, but we want to make sure that the balance of the sender is updated before we update the balance of the receiver. We can use a transaction to ensure that both operations are executed atomically.
  await prisma.$transaction(async (prisma) => {
    // First, find the sender's account to check balance
    const senderAccount = await prisma.account.findFirst({
      where: { userId: fromUserId },
    });

    if (!senderAccount) {
      console.error("Sender account not found");
      return;
    }

    if (senderAccount.balance < amount) {
      console.error("Insufficient funds");
      return;
    }

    // Decrement the sender's balance
    const sender = await prisma.account.update({
      where: { id: senderAccount.id },
      data: { balance: { decrement: amount } },
    });

    const receiver = await prisma.account.findFirst({
      where: { userId: toUserId },
    });

    if (!receiver) {
      console.error("Receiver account not found");
      return;
    }

    // Increment the receiver's balance
    const updatedReceiver = await prisma.account.update({
      where: { id: receiver.id },
      data: { balance: { increment: amount } },
    });

    console.log(`Sent $${amount} from user ${fromUserId} to user ${toUserId}`);
    console.log(`Sender's new balance: $${sender.balance}`);
    console.log(`Receiver's new balance: $${updatedReceiver.balance}`);
  });
};

await sendMoney(1, 2, 100);
