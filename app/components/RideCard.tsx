import { MapPin, Clock, User } from "lucide-react";

interface RideCardProps { 
    ride: {
        driver: string;
        car: string;
        origin: string;
        destination: string;
        time: string;
        availableSeats: number;
    }
}

export default function RideCard({ride}: RideCardProps) {

  return (
    <div className="w-full max-w-2xl bg-white text-blue-400 shadow-xl rounded-2xl p-6 flex gap-6 items-center">
      <div className="w-16 h-16 bg-blue-400 text-white font-bold flex items-center justify-center text-xl">
        {ride.driver[0]}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">{ride.driver}</h2>
        <p className="text-sm text-blue-400/80">{ride.car}</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{ride.origin} → {ride.destination}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{ride.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{ride.availableSeats} asientos disponibles</span>
          </div>
        </div>
      </div>
      <button className="bg-blue-400 text-white font-bold rounded-xl px-4 py-2">
        Unirse al viaje
      </button>
    </div>
  );
}