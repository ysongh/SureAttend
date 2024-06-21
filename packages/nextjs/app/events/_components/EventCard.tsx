"use client";

import React from 'react';
import { byteArray } from "starknet-dev";

import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract';

function EventCard({ event, id } : any) {
  const { data: eventname } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventname_byid",
    args: [id]
  });

  const { data: location } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventlocaiton_byid",
    args: [id]
  });

  return (
    <div key={event.id} className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold">{eventname && byteArray.stringFromByteArray(eventname as any)}</h2>
      <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700">{location && byteArray.stringFromByteArray(location as any)}</p>
      <p className="mt-4">{event.description}</p>
    </div>
  )
}

export default EventCard;