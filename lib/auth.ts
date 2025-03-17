"use server";
import { userRepository } from "@/repositories/userRepository";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromToken() : Promise<User | null> {
  try {
    const token = (await cookies()).get('token')?.value;
    if(!token) throw new Error("No token");

    const decoded = jwt.decode(token) as jwt.JwtPayload;
    if(decoded && decoded.email){
        return userRepository.findUserByEmail(decoded.email);
    } else throw new Error("No email on token");
  } catch (error) {
    return null; 
  }
}