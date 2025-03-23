import { Trip } from "@/types/trip";
import { MapPin, Clock, User } from "lucide-react";

export default function RideCard({ trip }: { trip: Trip }) {
  trip.startTime = new Date(trip.startTime);
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
            <span>{`Trip starts ${trip.startTime.getDate().toString().padStart(2, '0')}-${trip.startTime.getMonth().toString().padStart(2, '0')}-${trip.startTime.getFullYear()} ${trip.startTime.getHours().toString().padStart(2, '0')}:${trip.startTime.getMinutes().toString().padStart(2, '0')}`}</span>
          </div>
        </div>
      </div>
      <button className="bg-blue-400 text-white font-bold rounded-xl px-4 py-2 cursor-pointer">
        Get on Board!
      </button>
    </div>
  );
}