
"use client";

import RideCard from "@/app/components/RideCard";
import { getUserFromToken } from "@/lib/auth";
import { Car } from "@/types/car";
import { Trip } from "@/types/trip";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export default function ProfileContent() {
    const [user, setUser] = useState<User | null>(null);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [showPlate, setShowPlate] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        let userId: number | undefined;
        getUserFromToken()
        .then(user => {
            userId = user?.id;
        })
        .then(() => {
            fetch(`${API_URL}/users/${userId}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                setUser(data);
                setTrips(data.driverTrips);
                setCars(data.car);
                setLoading(false);
            })
            .catch(err => console.error(err));            
        })
        .catch(err => console.error(err));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 bg-gray-100 flex flex-col gap-8 items-center">
            <h1 className="text-4xl font-bold text-blue-400 mb-8">My Profile</h1>
    
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-40 h-40 relative mb-4 md:mb-0 md:mr-6 overflow-hidden">
                        {user?.profilePicture ? (
                            <img 
                                src={user.profilePicture} 
                                alt={user.name} 
                                className="rounded-full object-cover h-full w-full"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-5xl text-blue-400">{user?.name?.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <p className="text-gray-600"><span className="font-semibold">Email:</span> {user?.email}</p>
                                <p className="text-gray-600"><span className="font-semibold">Phone:</span> {user?.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-600"><span className="font-semibold">DNI:</span> {user?.dni}</p>
                                <p className="text-gray-600"><span className="font-semibold">Gender:</span> {user?.gender}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Cars Section */}
            <h2 className="text-2xl font-bold text-blue-400 mb-4">My Cars</h2>
            {cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {cars.map((car, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                            <h3 className="font-bold text-lg text-blue-400">{car.brand} {car.model}</h3>
                            <p className="text-gray-600">Year: {car.year}</p>
                            <p className="text-gray-600">
                                License plate: {showPlate ? car.plate : "• • • • • •"}
                            </p>
                            <button 
                                onClick={() => setShowPlate(prev => !prev)}
                                className="mt-2 text-sm px-2 py-1 bg-blue-400 hover:bg-blue-500 rounded transition cursor-pointer"
                            >
                                {showPlate ? "Hide plate" : "Show plate"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 text-center">
                    <p className="text-gray-600">No cars registered yet.</p>
                    <button className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
                        Add a Car
                    </button>
                </div>
            )}
            
            {/* Trips Section */}
            <h2 className="text-2xl font-bold text-blue-400 mb-4">My Trips</h2>
            {trips.length > 0 ? (
                <div className="flex flex-col gap-8">
                    {trips.map((trip, index) => (
                        <RideCard trip={trip} key={index} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <p className="text-gray-600">No trips found.</p>
                    <button className="mt-4 bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
                        Create a Trip
                    </button>
                </div>
            )}
        </div>
    );
}