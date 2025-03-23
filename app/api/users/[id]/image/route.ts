import { userService } from "@/services/userService";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const url = new URL(req.url);
        const id = url.pathname.split("/")[3];

        const formData = await req.formData();
        const image = formData.get("image") as File | null;

        if(!id) throw new Error("ID not provided");
        if(!image) throw new Error("Image not provided");

        const savedImage = await userService.uploadProfileImageAsync(parseInt(id), image);
        return NextResponse.json(`Image uploaded in: ${savedImage}`, { status: 201 });
    }catch(ex){
        return NextResponse.json({message: ex}, {status: 400});
    }
}