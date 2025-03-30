'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '@/repositories/userRepository';



export async function loginAction(email: string, password: string) {
    const userFromDb = await userRepository.findUserByEmail(email);

    if (!userFromDb || !(await bcrypt.compare(password, userFromDb.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: userFromDb.id, email: userFromDb.email }, process.env.JWT_SECRET!, {
        expiresIn: '1d'
    });

    (await cookies()).set('token', token, { httpOnly: true, secure: true, sameSite: 'none', path: '/' });
    redirect('/');
}