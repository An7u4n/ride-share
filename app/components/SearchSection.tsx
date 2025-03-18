"use client";
import { useState } from "react";
import SearchBarComponent from "./SearchBarComponent";
import RideCard from "./RideCard";

export default function SearchSection(){

    const [searchData, setSearchData] = useState();

    const handleSearch = (data: any) => {
      console.log("Búsqueda enviada:", data);
      setSearchData(data);
    };

    const ride = {
        driver: "Juan Perez",
        car: "Toyota Corolla 2018",
        origin: "San Salvador",
        destination: "Santa Ana",
        time: "8:00 AM",
        availableSeats: 3,
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-[-200px]">
            <h1 className="text-4xl font-bold text-blue-400">Looking for a Ride?</h1>
                <SearchBarComponent onSearch={handleSearch}/>

            <div>
                <RideCard ride={ride}  />
            </div>
        </div>
    )
}