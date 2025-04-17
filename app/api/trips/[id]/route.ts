import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url);
    const id = parseInt(url.pathname.split("/")[3]);

    const trip = await prisma.trip.findFirst(
        {
            where: {
                id: id
            },
            include: {
                car: true,
                driver: true,
                users: true
            }
        },
    )

    if(!trip) return NextResponse.json({message: "Trip not found"}, {status: 404});

    return NextResponse.json(trip, {status: 200});
}