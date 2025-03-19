import { carRepository } from "@/repositories/carRepository";
import { userRepository } from "@/repositories/userRepository";
import { Car } from "@/types/car";

export const carService = {
    async createCar(car: Car) {

        const user = await userRepository.findUserById(car.ownerId);

        const existingCar = await carRepository.findCarByPlate(car.plate);

        if(existingCar) {
            throw new Error("Plate already registered");
        }

        if (!user) {
            throw new Error("User doesnt exists");
        }

        if (!car.brand || !car.model || !car.year || !car.ownerId || !car.plate) {
            throw new Error("Missing required car fields: brand, model, year, plate or ownerId");
        }

        await carRepository.createCar(car);
    }
};