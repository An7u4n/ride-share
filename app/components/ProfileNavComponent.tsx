"use client"
import React, { useState } from 'react';
import { logout } from '../actions/logout';
import Link from 'next/link';

interface ProfileNavComponentProps {
    name: string;
    image?: string;
}

export default function ProfileNavComponent({ name, image }: ProfileNavComponentProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 cursor-pointer"
            >
                <span className="font-bold">{name}</span>
                {image ? (
                    <img
                        src={image}
                        alt="Profile photo"
                        className="w-10 h-10 rounded-full object-cover mr-4"
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-10 h-10 text-gray-400 mr-4"
                    >
                        <path d="M12 2a5 5 0 00-4.999 5.08c0 2.374 1.62 4.37 3.845 4.887v1.033H6.5A2.5 2.5 0 004 15.5v3c0 .827.673 1.5 1.5 1.5h13c.827 0 1.5-.673 1.5-1.5v-3a2.5 2.5 0 00-2.5-2.5H13.154v-1.034A5.002 5.002 0 0012 2z" />
                    </svg>
                )}
            </div>
            {open && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg">
                    <ul className="py-1 text-blue-400 font-bold text-xl">
                        <li className="px-4 py-2 hover:bg-blue-200 cursor-pointer">
                            <Link href="/profile">
                                Profile
                            </Link>
                        </li>
                        <li className="px-4 py-2 hover:bg-blue-200 cursor-pointer" onClick={logout}>
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}