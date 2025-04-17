"use client";
import { getUserFromToken } from '@/lib/auth';
import { Trip } from '@/types/trip';
import { User } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TripInfo() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip>();
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [user, setUser] = useState<User | null>(null);
  const [userJoined, setUserJoined] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/trips/${id}`)
    .then(res => res.json())
    .then(data => {
      setTrip(data);
      setLoading(false);
      getUserFromToken()
        .then(user => {
          if (!user) {
            console.error("User not logged in");
            return;
          }
          setUser(user);
        })
      })
    .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (trip && user) {
      console.log("userId:", user.id, "driverId:", trip.driverId, "users:", trip.users);
      if (trip.driverId === user.id || trip.users?.some(x => x.id === user.id)) {
        setUserJoined(true);
      }
    }
  }, [trip, user]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
    );
  }

  function onJoinTrip() {
    fetch(`${API_URL}/trips/${id}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user?.id }),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Joined trip successfully!");
      setUserJoined(true);
    })
  }

  return (
    <div>
      {trip && 
      <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-xl shadow-lg rounded-2xl border-2 border-blue-400 grid grid-cols-1 md:grid-cols-2 grid-rows-1 bg-white">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-400 mb-4">Trip Details</h1>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold text-blue-400">Origin:</span> {trip.origin}</p>
              <p><span className="font-semibold text-blue-400">Destination:</span> {trip.destination}</p>
              <p><span className="font-semibold text-blue-400">Departure:</span> {new Date(trip.startTime).toLocaleString()}</p>
              {trip.driver && (
                <p><span className="font-semibold text-blue-400">Driver:</span> {trip.driver.name}</p>
              )}
              {trip.car && (
                <p><span className="font-semibold text-blue-400">Car:</span> {trip.car.brand} {trip.car.model}</p>
              )}
            </div>
            <div className="mt-6">
              {!userJoined ? <button onClick={onJoinTrip} className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md">
                Join!
              </button> : <p className="bg-gray-400 hover:bg-blue-400 text-white px-4 py-2 rounded-xl shadow-md w-fit">Already in</p>}
            </div>
          </div>
          <div className='flex items-center justify-center p-6 flex-col text-gray-700'>
            <p className='font-bold text-blue-400 text-2xl pb-4'>Trip Driver</p>
            {trip.driver?.profilePicture ? (
              <img 
                  src={trip.driver?.profilePicture} 
                  alt={trip.driver?.name} 
                  className="rounded-full object-cover h-30 w-30"
              />
              ) : (
              <div className="rounded-full bg-blue-100 flex items-center justify-center h-30 w-30">
                <span className="text-5xl text-blue-400">{trip.driver?.name?.charAt(0)}</span>
              </div>
            )}
            <p>
              <span className='font-semibold text-blue-400'>Driver:</span> {trip.driver?.name}
            </p>
            <p>
              <span className='font-semibold text-blue-400'>Car:</span> {trip.car?.brand} {trip.car?.model} {trip.car?.year}
            </p>
          </div>
          <div>
            {trip.users && 
            <div className='flex flex-col items-center justify-center p-6'>
              <p className='font-bold text-blue-400 text-2xl pb-4'>Trip Passengers</p>
              {trip.users.map((user) => (
                <div key={user.id} className='flex items-center justify-center p-2'>
                  {user.profilePicture ? (
                    <img 
                      src={user.profilePicture} 
                      alt={user.name} 
                      className="rounded-full object-cover h-10 w-10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-2xl text-blue-400">{user.name?.charAt(0)}</span>
                    </div>
                  )}
                  <p className='pl-2 text-blue-400'>{user.name}</p>
                </div>
              ))}
            </div>
            }
          </div>
        </div>
      </div> }
    </div>
  )
}
