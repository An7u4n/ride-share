import { tripService } from "@/services/tripService";
import { Trip } from "@/types/trip";
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body: Trip = await req.json();

        await tripService.createTrip(body);
        return NextResponse.json({body: body, message: "Trip Created" }, {status: 201});
    }catch(ex){
        return NextResponse.json({message: "Trip not created. "+ex}, { status: 400 });
    }
}