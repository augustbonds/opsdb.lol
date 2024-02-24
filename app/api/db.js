import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUserIfNotExists(email, name) {
  console.log("creating user if doesn't exist");
  // Try to find the user first
  let user = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  // If user doesn't exist, create a new one
  if (!user) {
    user = await prisma.User.create({
      data: {
        email,
        name,
      },
    });
  }

  return user;
}