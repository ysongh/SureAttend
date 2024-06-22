"use client";

import { byteArray } from "starknet-dev";

import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

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

  return (
    <div className="mx-auto p-4">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{eventname && byteArray.stringFromByteArray(eventname as any)}</h1>
        <p className="text-gray-500">{new Date("2024-08-15").toLocaleDateString()}</p>
        <p className="text-gray-700">{location && byteArray.stringFromByteArray(location as any)}</p>
        <p className="mt-4">Test</p>
      </div>
    </div>
  );
}

export default EventDetail;
