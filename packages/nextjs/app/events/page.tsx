"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import EventCard from "./_components/EventCard";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Events: NextPage = () => {
  const router = useRouter();

  const { data: totalEvent } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalEvent",
  });

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => router.push("/events/create")}
        >
          Create Event
        </button>
      </div>
      <div className="space-y-8">
        {[...Array(totalEvent)].map((_, index) => (
          <EventCard key={index} id={index} />
        ))}
      </div>
    </div>
  );
}

export default Events;
