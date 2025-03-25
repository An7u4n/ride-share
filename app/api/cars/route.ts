import { getUserFromToken } from "@/lib/auth";
import { carService } from "@/services/carService";
import { Car } from "@/types/car";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const body: Car = await req.json();
        await carService.createCar(body);

        return NextResponse.json({ message: "Car created"}, { status: 201});
    } catch(ex){
        return NextResponse.json({ message: "Car not created. "+ex}, { status: 400});
    }
}

export async function GET(req: NextRequest){
    const user = await getUserFromToken();
    if(!user) return NextResponse.json({ message: "User not logged" }, { status: 400 })
    const cars = await carService.getCarsById(user.id);

    return NextResponse.json({ cars }, { status: 200 })
}