import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, dni, email, password, phone, gender, profilePicture } = await request.json();
    if (!name || !dni || !email || !password || !phone || !gender || !profilePicture) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const driver = await prisma.user.create({
      data: { name, dni, email, password: hashedPassword, phone, gender, profilePicture },
    });

    return NextResponse.json(driver, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}