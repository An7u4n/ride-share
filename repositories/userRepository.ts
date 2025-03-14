import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  async createUser(data: any) {
    return prisma.user.create({ data });
  },
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
};