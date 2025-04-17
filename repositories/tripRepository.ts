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
    async getTrips(){
        return await prisma.trip.findMany({include: { driver: true, car: true, users: true}});
    },
    async getTripsWithParams(limit: number, skip: number, origin?: string, destination?: string, startTime?: string, passengers?: number){
        return await prisma.trip.findMany({
            skip,
            include: {
                driver: true,
                car: true,
                users: true
            },
            where : {
                origin: {
                    contains: origin,
                },
                destination: {
                    contains: destination,
                }
            }
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
    },
    async getTotalTrips(){
        return await prisma.trip.count();
    }
}