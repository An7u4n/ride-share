import { Trip } from "@/types/trip";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tripRepository = {
    async createTrip(trip: Trip) {
        await prisma.trip.create({ 
            data: {
                carId: trip.carId,
                destination: trip.destination,
                origin: trip.origin,
                startTime: trip.startTime,
                driverId: trip.driverId,
            }
        });
    },
    async getTrips(limit: number, skip: number){
        return await prisma.trip.findMany({
            skip,
            take: limit,
            include: {
                driver: true,
                car: true
            },
        });
    }
}