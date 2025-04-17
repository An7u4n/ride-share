import { userService } from "@/services/userService";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    try{
        const url = new URL(req.url);
        const id = parseInt(url.pathname.split("/")[3]);

        if(!id) throw new Error("ID not provided");

        const user = await userService.getUserAsync(id);
        if(!user) return NextResponse.json({message: "User doesnt exists"}, {status: 404});

        const trips = await userService.getUserTrips(id);
        
        return NextResponse.json(trips, {status: 200});
    }catch(ex){
        return NextResponse.json({message: ex}, {status: 400});
    }
}