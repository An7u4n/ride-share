import { Car } from "./car";
import { User } from "./user";

export interface Trip {
    id?: number;
    driverId: number;
    origin: string;
    destination: string;
    startTime: Date;
    carId: number;
    car?: Car;
    driver?: User,
    users?: User[] 
}