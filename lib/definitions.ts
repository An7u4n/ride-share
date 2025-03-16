import { z } from "zod";

export const UserRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least two characters long"),
    dni: z
        .string()
        .regex(/^\d+$/, "DNI must be only numbers")
        .length(8, "DNI must be exactly eight characters long"),
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least eight characters long")
        .max(20, "Password must be at most 20 characters long"),
    phone: z
        .string()
        .regex(/^\d+$/, "Phone can only include numbers")
        .min(10, "Phone number must be at least 10 characters long"),
    gender: z.enum(["MALE", "FEMALE"], { message: "Invalid gender" }),
});
