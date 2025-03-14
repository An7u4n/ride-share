import bcrypt from 'bcrypt';
import { userRepository } from '@/repositories/userRepository';

export const authService = {
  async registerUser(data: any) {
    const existingUser = await userRepository.findUserByEmail(data.email);
    if (existingUser) throw new Error('User already exists');

    data.password = await bcrypt.hash(data.password, 10);
    return userRepository.createUser(data);
  }
};