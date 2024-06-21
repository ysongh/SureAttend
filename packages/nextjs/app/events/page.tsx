"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";

import EventCard from "./_components/EventCard";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    date: '2024-07-20',
    location: 'San Francisco, CA',
    description: 'Join us for a day of insightful tech talks and networking.',
  },
  {
    id: 2,
    title: 'Art Expo',
    date: '2024-08-15',
    location: 'New York, NY',
    description: 'Experience the latest in contemporary art.',
  },
];

const Events: NextPage = () => {
  const router = useRouter();

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
        {events.map((event, index) => (
          <EventCard key={index} event={event} id={index} />
        ))}
      </div>
    </div>
  );
}

export default Events;
