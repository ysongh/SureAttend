"use client";

import { byteArray } from "starknet-dev";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

const EventDetail = ({ params }: { params: { id: number } }) => {
  const { data: eventname } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventname_byid",
    args: [params.id]
  });

  const { data: location } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventlocaiton_byid",
    args: [params.id]
  });

  const { data: date } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventdate_byid",
    args: [params.id]
  });

  const { data: description } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventdescription_byid",
    args: [params.id]
  });

  const { data: join } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_eventjoin_byid",
    args: [params.id]
  });

  const { writeAsync: join_event } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "join_event",
    args: [params.id],
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-4xl font-bold mb-4">{eventname && byteArray.stringFromByteArray(eventname as any)}</h1>
          <p className="text-gray-500 mb-2">{date && new Date(byteArray.stringFromByteArray(date as any)).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-4">{location && byteArray.stringFromByteArray(location as any)}</p>
          <p className="text-lg text-gray-800 leading-relaxed">{description && byteArray.stringFromByteArray(description as any)}</p>
          <p className="flex items-center">
            <UserGroupIcon  className="h-5 w-5 mr-2"/> {join?.toString()}
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => join_event()}
          >
            Join Event
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
