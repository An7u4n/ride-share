import { Car } from "./car";
import { Trip } from "./trip";

export type User = {
    id: number | undefined;
    name: string;
    dni: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    profilePicture: string | undefined;
    createdAt: string | undefined;
    car?: Car[],
    trips?: Trip[],
    driverTrips?: Trip[]
};
