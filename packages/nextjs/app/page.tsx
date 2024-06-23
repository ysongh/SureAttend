"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-stark";
import { useAccount } from "@starknet-react/core";
import { Address as AddressType } from "@starknet-react/chains";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { byteArray } from "starknet-dev";

const Home: NextPage = () => {
  const connectedAddress = useAccount();

  const { data: owner } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "owner",
  });

  const { data: totalCounter } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const { data: greeting } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  const { writeAsync: set_greeting } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: ["Hello, world!", 0],
  });

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Sure Attend</h1>
          <p className="text-xl text-gray-700 mb-8 text-center">
            Sure Attend is a web application designed for event registration
          </p>
          <div className="space-x-4">
            <Link href="/events/create" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Create Event
            </Link>
            <Link href="/events" className="bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              View Events
            </Link>
          </div>
        </div>

        {/* <div
          onClick={() => {
            writeAsync();
          }}
        >
          TEST TX
        </div> */}
      </div>
    </>
  );
};

export default Home;
