import { carService } from "@/services/carService";
import { Car } from "@/types/car";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body: Car = await req.json();
        await carService.createCar(body);

        return NextResponse.json({ message: "Car created"}, { status: 201});
    } catch(ex){
        return NextResponse.json({ message: "Car not created. "+ex}, { status: 400});
    }
}