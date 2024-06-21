"use client";

import React from 'react';

function EventCard({ event } : any) {
  return (
    <div key={event.id} className="p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold">{event.title}</h2>
      <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-700">{event.location}</p>
      <p className="mt-4">{event.description}</p>
    </div>
  )
}

export default EventCard;