"use client";
import { getUserFromToken } from '@/lib/auth';
import { Car } from '@/types/car';
import React, { useEffect, useState } from 'react'

export default function AddCar() {

    const [ownerId, setOwnerId] = useState<number>(0);

    useEffect( () => {
        getUserFromToken().then(user => {
            if(!user) return;
            setOwnerId(user.id);
        } );
    }, [])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const car: Car = {
            brand: formData.get("brand") as string,
            model: formData.get("model") as string,
            plate: formData.get("plate") as string,
            year: parseInt(formData.get("year") as string),
            ownerId: ownerId
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            alert("Car added successfully!");
            (e.target as HTMLFormElement).reset();
        })
        .catch(error => {
            console.error("Error adding car:", error);
            alert("Failed to add car. Please try again.");
        });
    }

  return (
    <div className='bg-blue-400 h-screen flex flex-col items-center justify-center gap-8'>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md border border-gray-300">
            <form 
                className="flex flex-col gap-4 text-blue-400"
                onSubmit={handleSubmit}
                >
                <label className="flex flex-col">
                    Brand
                    <input 
                        type="text" 
                        name="brand"
                        placeholder="Car brand" 
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </label>
                <label className="flex flex-col">
                    Model
                    <input 
                        type="text" 
                        name="model"
                        placeholder="Car model" 
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </label>
                <label className="flex flex-col">
                    Year
                    <input 
                        type="number" 
                        name="year" 
                        placeholder="Manufacturing year"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </label>
                <label className="flex flex-col">
                    Plate
                    <input 
                        type="text" 
                        name="plate" 
                        placeholder="License plate"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </label>
                <button 
                    type="submit"
                    className="bg-blue-400 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                >
                    Add Car
                </button>
            </form>
        </div>
    </div>

  )
}
