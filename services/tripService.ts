import { Car } from "@/types/car";
import { PrismaClient } from "@prisma/client"
import { Trip } from "@/types/trip";
import { tripRepository } from "@/repositories/tripRepository";

const prisma = new PrismaClient();

export const tripService = {
    async createTrip(tripData: Trip) {
        if(!tripData || !tripData.carId || !tripData.destination || !tripData.driverId || !tripData.origin || !tripData.startTime) {
            throw new Error("Missing one or more required trip fields: carId, destination, driverId, origin or startTime");
        }

        const driver = await prisma.user.findUnique({ where: { id: tripData.driverId } });
        const cars = await prisma.car.findMany({ where: { ownerId: tripData.driverId } });

        if(!driver) throw new Error("Driver doesnt exist");
        
        if (!cars?.some((x: Car) => x.id === tripData.carId)) throw new Error("Car doesnt exist");
        
        if(tripData.destination === tripData.origin) throw new Error("Destination and origin cant be same");
        
        if(tripData.startTime < new Date()) throw new Error("Ride start cant be in the past");

        await tripRepository.createTrip(tripData);
    },
    async getTrips(limit: number, skip: number){
        return await tripRepository.getTrips(limit, skip);
    }
}