import { Trip } from "@/types/trip";
import { PrismaClient, User } from "@prisma/client";

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
    },
    async getTripById(tripId: number){
        return await prisma.trip.findFirst({
            where: {
                id: tripId
            },
            include: {
                users: true
            },
        });
    },
    async updatePassengers(passengers: User[], tripId: number){
        const trip = await this.getTripById(tripId);
        console.log(passengers);
        await prisma.trip.update({
            where: {
                id: tripId
            },
            data: {
                users: {
                    connect: passengers.map(user => ({ id: user.id }))
                }
            }
        })
    }
}