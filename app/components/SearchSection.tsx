"use client";
import { useEffect, useState } from "react";
import SearchBarComponent from "./SearchBarComponent";
import RideCard from "./RideCard";
import { Trip } from "@/types/trip";

export default function SearchSection(){

    const [searchData, setSearchData] = useState();
    const [trips, setTrips] = useState<Trip[]>([]);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const handleSearch = (data: any) => {
      setSearchData(data);
    };

    useEffect(() => {
        fetch(`${API_URL}/trips`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                console.log("API response:", data);
                setTrips(data.trips)
            })
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-[-200px]">
            <h1 className="text-4xl font-bold text-blue-400">Looking for a Ride?</h1>
            <SearchBarComponent onSearch={handleSearch}/>
            <h3 className="self-start mt-4 text-2xl font-bold text-blue-400">Last Trips:</h3>
            <div className="flex flex-col gap-8">
                {trips.map((trip, index) => (
                    <RideCard trip={trip} key={index} />
                ))}
            </div>
        </div>
    )
}