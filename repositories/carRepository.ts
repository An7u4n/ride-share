import { Car } from "@/types/car";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const carRepository = {
    async createCar(car: Car){
        await prisma.car.create({
            data: {
                brand: car.brand,
                model: car.model,
                plate: car.plate,
                year: car.year,
                ownerId: car.ownerId
            }
        });
    },
    async findCarByPlate(plate: string) {
        const car = await prisma.car.findFirst({ where: { plate: plate } });
        return car;
    }
}