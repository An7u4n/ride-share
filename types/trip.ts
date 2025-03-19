export interface Trip {
    id?: number;
    driverId: number;
    origin: string;
    destination: string;
    startTime: Date;
    carId: number;
}