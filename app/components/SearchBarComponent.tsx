"use client";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

export interface SearchBarProps {
    onSearch: (searchData: { from: string; to: string; date: string; passengers: number }) => void;
}

export default function SearchBarComponent({ onSearch }: SearchBarProps) {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState(1);

    const handleSubmit = () => {
        onSearch({ from, to, date, passengers });
    };

    return (
        <div className="flex items-center bg-white shadow-md rounded-2xl p-2 w-full max-w-3xl text-gray-700">
            <input
                type="text"
                placeholder="From"
                className="px-4 py-2 w-1/4 outline-none"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
            />
            <span className="border-l h-8" />
            <input
                type="text"
                placeholder="To"
                className="px-4 py-2 w-1/4 outline-none"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <span className="border-l h-8" />
            <div className="flex items-center px-4 w-1/4">
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
            <div className="flex items-center px-4 w-1/4">
                <FaUser className="mr-2 text-gray-500" />
                <input
                    type="number"
                    min="1"
                    className="outline-none w-12 text-center"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                />
                <span className="ml-2">passenger(s)</span>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-xl ml-4 hover:bg-blue-600" onClick={handleSubmit}>
                Search
            </button>
        </div>
    );
}
