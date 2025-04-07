import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    const trip = await prisma.trip.findFirst(
        {
            where: {
                id: parseInt(id)
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