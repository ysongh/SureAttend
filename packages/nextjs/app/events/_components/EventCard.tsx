"use client";

import React from 'react';
import Link from 'next/link';
import { byteArray } from "starknet-dev";

import { useScaffoldReadContract } from '~~/hooks/scaffold-stark/useScaffoldReadContract';

function EventCard({ id } : any) {
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

  const { data: date } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventdate_byid",
    args: [id]
  });

  return (
    <div className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold">{eventname && byteArray.stringFromByteArray(eventname as any)}</h2>
      <p className="text-gray-500">{date && new Date(byteArray.stringFromByteArray(date as any)).toLocaleDateString()}</p>
      <p className="text-gray-700">{location && byteArray.stringFromByteArray(location as any)}</p>
      <Link href={`/events/event/${id}`}>
        View
      </Link>
    </div>
  )
}

export default EventCard;