import { Car } from "@/types/car";
import { PrismaClient } from "@prisma/client"
import { Trip } from "@/types/trip";
import { tripRepository } from "@/repositories/tripRepository";
import { userService } from "./userService";

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
    async getTrips(limit: number, skip: number, origin?: string, destination?: string, startTime?: string, passengers?: number){
        const totalTrips = await tripRepository.getTotalTrips();
        const trips = await tripRepository.getTripsWithParams(limit, skip, origin, destination, startTime, passengers);
        return {trips, totalTrips};
    },
    async joinTrip(userId: number, tripId: number) {
        const trip = await tripRepository.getTripById(tripId);
        if(!trip) throw new Error("Trip doesnt found");
        const user = await userService.getUserAsync(userId);
        if(!user) throw new Error("User doesnt exist");
        if(trip.users.some(u => u.id == userId)) throw new Error("User already registered at the trip");

        await tripRepository.updatePassengers([...trip.users, user], tripId);
    }
}