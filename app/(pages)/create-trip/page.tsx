"use client";
import { getUserFromToken } from '@/lib/auth';
import { Car } from '@/types/car';
import { Trip } from '@/types/trip'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function CreateTrip() {
    const [cars, setCars] = useState<Car[]>([]);
    const [driverId, setDriverId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserFromToken().then(user => {
            if(!user) return;
            setDriverId(user.id);
            setLoading(false);
        } );

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => setCars(data.cars))
            .catch(err => console.error);
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const trip: Trip = {
            origin: formData.get("origin") as string,
            destination: formData.get("destination") as string,
            carId: parseInt(formData.get("car") as string),
            startTime: new Date(formData.get("date") as string + "T" + formData.get("hour") as string),
            driverId: driverId!
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            alert("Trip created successfully!");
            (e.target as HTMLFormElement).reset();
        })
        .catch(error => {
            console.error("Error creating trip:", error);
            alert("Failed to create trip. Please try again.");
        });
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
        );
    }

    return (
        <div className="py-8 px-4 flex flex-col gap-8 items-center h-[100vh] bg-blue-400">
            <h1 className="text-4xl font-bold text-blue-400 mb-8">Create a Trip</h1>
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                { cars.length > 0 &&
                <form 
                    className="flex flex-col gap-4 text-blue-400"
                    onSubmit={handleSubmit}
                    >
                    <label className="flex flex-col">
                        Origin
                        <input 
                            type="text" 
                            name="origin"
                            placeholder="Origin" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        Destination
                        <input 
                            type="text" 
                            name="destination"
                            placeholder="Destination" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        Car
                        <select 
                            name="car" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            defaultValue=""
                        >
                            <option value="" disabled>Select a car</option>
                            {cars.map((car, index) => (
                                <option key={index} value={car.id}>{car.plate} - {car.brand+" "+car.model}</option>
                            ))}
                        </select>
                    </label>
                    <label className="flex flex-col">
                        Date
                        <input 
                            type="date" 
                            name="date" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </label>
                    <label className="flex flex-col">
                        Hour
                        <input 
                            type="time" 
                            name="hour" 
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </label>
                    <button 
                        type="submit"
                        className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                    >
                        Create Trip
                    </button>
                </form>
                }
                {cars.length == 0 &&
                <div className="flex flex-col gap-4 text-blue-400">
                    <p className="text-lg font-bold">You don't have any cars registered.</p>
                    <p className="text-sm">Please register a car to create a trip.</p>
                    <Link
                        className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                        href={"/add-car"}>
                        Add a Car
                    </Link>
                </div>
                }
            </div>
        </div>
    )
}
