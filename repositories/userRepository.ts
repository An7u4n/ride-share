import { User } from '@/types/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userRepository = {
  async createUser(user: User) {
    await prisma.user.create({
        data: { 
          name: user.name, 
          dni: user.dni, 
          email: user.email, 
          password: user.password, 
          phone: user.phone, 
          gender: user.gender, 
          profilePicture: (user.profilePicture ? user.profilePicture : '')
        },
      });
  },
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
};