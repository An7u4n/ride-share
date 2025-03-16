"use server";
import bcrypt from 'bcrypt';
import { userRepository } from '@/repositories/userRepository';
import { User } from '@/types/User';
import { UserRegisterSchema } from '@/lib/definitions';

export async function registerAction(user: User) {
    const parsed = UserRegisterSchema.safeParse(user);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.flatten().fieldErrors };
    }
  
    const existingUser = await userRepository.findUserByEmail(user.email);
    if (existingUser) {
      return { success: false, errors: { email: ['User already exists'] } };
    }

    user.password = await bcrypt.hash(user.password, 10);
    await userRepository.createUser(user);

    return ({ success: true, message: `User: ${user.name} registered` });
}