"use client";
import { useEffect, useState } from "react";
import RideCard from "./RideCard";
import { Trip } from "@/types/trip";
import { getUserFromToken } from "@/lib/auth";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

export default function SearchSection(){

    const [trips, setTrips] = useState<Trip[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(100);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    // const [totalPages, setTotalPages] = useState<number>(1);

    const handleSearch = () => {
        
    };

    useEffect(() => {
        let query = `${API_URL}/trips?page=${page}&limit=${limit}`;
        if(from) query += `&origin=${from}`;
        if(to) query += `&destination=${to}`;
        if(date) query += `&startTime=${date}`;
        if(passengers) query += `&passengers=${passengers}`;
        
        getUserFromToken()
        .then(userLogged => {
            if(userLogged)
                setUserId(userLogged.id);
        }).then(() => {
        fetch(query)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                console.log("API response:", data);
                setTrips(data.trips)
                // setTotalPages(parseInt(data.totalTrips)/limit+1);
            })
            .catch(err => console.error(err));
        })}, [from, to, passengers, date, page]);


    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-[-200px]">
            <h1 className="text-4xl font-bold text-blue-400">Looking for a Ride?</h1>

            <div className="flex items-center bg-white shadow-md rounded-2xl p-2 w-full max-w-3xl text-gray-700">
                <input
                    type="text"
                    placeholder="From"
                    className="px-4 py-2 w-1/3 outline-none"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <span className="border-l h-8" />
                <input
                    type="text"
                    placeholder="To"
                    className="px-4 py-2 w-1/3 outline-none"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <span className="border-l h-8" />
                <div className="flex items-center px-4 w-1/3">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    <input
                        min={new Date().toISOString().split("T")[0]}
                        type="date"
                        className="outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <span className="border-l h-8" />
                <button className="bg-blue-500 text-white px-6 py-2 rounded-xl ml-4 hover:bg-blue-600" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <h3 className="self-start mt-4 text-2xl font-bold text-blue-400">Last Trips:</h3>
            <div className="flex flex-col gap-8 overflow-y-auto max-h-[450px] w-full p-4">
                {trips.map((trip, index) => (
                    (trip.driverId !== userId) && (
                        <RideCard trip={trip} key={index} />
                    )
                ))}
            </div>

            {/* <div className="flex justify-center mt-6">
                <button
                className="bg-blue-500 px-3 py-2 rounded mx-1 disabled:opacity-50"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                >
                Previous
                </button>

                <span className="px-4 py-2 text-blue-400">Page {page} of {totalPages}</span>

                <button
                className="bg-blue-500 px-3 py-2 rounded mx-1 disabled:opacity-50"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page >= totalPages}
                >
                Next
                </button>
            </div> */}
            
        </div>
    )
}