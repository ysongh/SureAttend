"use client";

import type { NextPage } from "next";

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
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
      <div className="space-y-8">
        {events.map((event) => (
          <div key={event.id} className="p-6 border rounded-lg shadow-sm bg-white">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-700">{event.location}</p>
            <p className="mt-4">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
