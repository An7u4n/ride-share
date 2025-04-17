import { Trip } from '@/types/trip'
import { Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TripInfoCard({ trip }: { trip: Trip }) {
    const startTime = new Date(trip.startTime);
  return (
    <div className="w-full max-w-2xl bg-white text-blue-400 shadow-xl rounded-2xl p-6 flex gap-6 items-center">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-400 text-white font-bold flex items-center justify-center text-xl">
        {trip.driver?.profilePicture ? <img src={trip.driver?.profilePicture} alt={`Driver ${trip.driver?.name}`} /> : trip.driver?.name[0]}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">{trip.driver?.name}</h2>
        <p className="text-sm text-blue-400/80">{`Car: ${trip.car?.brand} ${trip.car?.model} ${trip.car?.year}`}</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{trip.origin} → {trip.destination}</span>
          </div>  
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{`Trip starts ${startTime.getDate().toString().padStart(2, '0')}-${startTime.getMonth().toString().padStart(2, '0')}-${startTime.getFullYear()} ${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`}</span>
          </div>
        </div>
      </div>
      <Link href={`trips/${trip.id}`} className="bg-gray-700 text-white font-bold rounded-xl px-4 py-2 cursor-pointer">
        Details
      </Link>
    </div>
  )
}
