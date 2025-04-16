import { tripService } from "@/services/tripService";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try{
        const { userId } = await req.json();
        const url = new URL(req.url);
        const tripId = url.pathname.split("/").slice(-2, -1)[0];
        console.log(userId, tripId);
        tripService.joinTrip(userId, parseInt(tripId));
        return NextResponse.json("ok", {status: 200});
    } catch(error) {
        return NextResponse.json(error, {status: 400});
    }
}