import { User } from '@/types/user';
import { PrismaClient, Gender } from '@prisma/client';

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
          gender: user.gender as Gender, 
          profilePicture: (user.profilePicture ? user.profilePicture : '')
        },
      });
  },
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  async findUserById(id: number){
    return prisma.user.findUnique({ where: { id: id } });
  },
  async findUserWithDetailsById(id: number){
    return prisma.user.findUnique({ where: { id: id }, include: { car: true, trips: true, driverTrips: true} });
  },
  async updateUserAsync(user: User) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: user.password,
        phone: user.phone,
        profilePicture: user.profilePicture,
      },
    });
  }
};