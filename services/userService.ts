import { userRepository } from "@/repositories/userRepository"
import { gcpService } from "./gcpService";
import { User } from "@/types/user";
import { tripRepository } from "@/repositories/tripRepository";

export const userService = {
    async uploadProfileImageAsync(userId: number, file: File){
        const savedUser = await userRepository.findUserById(userId);
        if(!savedUser) throw new Error("User not found");

        const savedImage = await gcpService.uploadFileAsync(file);

        const user: User = {
            dni: savedUser.dni,
            createdAt: savedUser.createdAt.toString(),
            email: savedUser.email,
            gender: savedUser.gender,
            id: savedUser.id,
            name: savedUser.name,
            password: savedUser.password,
            phone: savedUser.phone,
            profilePicture: savedImage
        }

        await userRepository.updateUserAsync(user);

        return savedImage;
    },
    async getUserAsync(userId: number){
        const user = await userRepository.findUserWithDetailsById(userId);
        if(!user) throw new Error("User not exists");

        return user;
    },
    async getUserTrips(userId: number){
        const trips = await tripRepository.getTrips();

        const asDriverTrips = trips.filter(x => x.driverId == userId);
        const asPassengerTrips = trips.filter(x => x.users.find(u => u.id == userId));

        return { driverTrips: asDriverTrips, passengerTrips: asPassengerTrips}
    }
}