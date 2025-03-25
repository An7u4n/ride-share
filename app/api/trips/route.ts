import { tripService } from "@/services/tripService";
import { Trip } from "@/types/trip";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const body: Trip = await req.json();

        await tripService.createTrip(body);
        return NextResponse.json({body: body, message: "Trip Created" }, {status: 201});
    }catch(ex){
        return NextResponse.json({message: "Trip not created. "+ex}, { status: 400 });
    }
}

export async function GET(req: NextRequest){
    try{
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const skip = (page - 1) * limit;
        const trips = await tripService.getTrips(limit, skip);

        return NextResponse.json({
            trips: trips,
            page,
            limit
        }, { status: 200 });
    }
    catch(ex){
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}