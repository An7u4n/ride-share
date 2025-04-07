"use client";
import { getUserFromToken } from "@/lib/auth";
import ProfileNavComponent from "./ProfileNavComponent";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircleIcon } from 'lucide-react';

export default function HeaderComponent() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    useEffect(() => {
        try{
            getUserFromToken().then(user => {
                if(!user) return;
                setName(user.name);
                console.log(name);
                setImage(user.profilePicture);
                console.log(image);
            }, err => console.error(err));
        } catch(error){
            console.error(error);
        }
    }, []);

    return (
        <header className="flex justify-between items-center p-6 text-blue-400 text-2xl bg-white">
            <h2 className="font-extrabold"><Link href="/">RideShare</Link></h2>
            { name != ""  && <Link href="/create-trip" className="flex items-center gap-2"><PlusCircleIcon className="font-bold"></PlusCircleIcon><p> Create Trip</p></Link> }
            { name != "" || image != "" ? <ProfileNavComponent name={name} image={image} /> : <Link href="/login">Login</Link> }
        </header>
    );
}