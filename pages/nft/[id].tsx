import React from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

function NFTDroppage() {
  //auth
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disconnect = useDisconnect();

  console.log(address);

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
      {/*Left side of screen */}
      <div className="lg:col-span-4 bg-gradient-to-br from-cyan-500 to-rose-500">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div
            className="bg-gradient-to-br
           from-yellow-400 to-purple-600 p-2 rounded-xl"
          >
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://i.imgur.com/hZ1oaQd.jpg"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-white">Aous Ape</h1>
            <h2 className="text-xl text-gray-300">
              A collection of Aous Apes who lives and breath react
            </h2>
          </div>
        </div>
      </div>
      {/*Right side of screen */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/*Header*/}
        <header className="items-center flex justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            The <span className="font-extrabold underline ">Aous</span> NFT
            Coding practice place
          </h1>
          <button
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="rounded-full bg-rose-400
           text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? "Sign Out" : "Sign in"}
          </button>
        </header>
        {address && (
          <p>
            You are logged in with wallet{" "}
            <span className="font-bold text-purple-600">
              {address.substring(0, 5)}...
              {address.substring(address.length - 5)}
            </span>
          </p>
        )}

        <hr className="my-2 border" />
        {/*Content*/}
        <div
          className="mt-10 flex flex-1 flex-col 
        items-center space-y-6 text-center 
        lg:space-y-0 lg:justify-center"
        >
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src="https://i.imgur.com/nv35UeG.png"
          />

          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            The Aous NFT Coding practice place
          </h1>

          <p className="pt-2 text-xl text-green-500">13/20 NFT's Claimed</p>
        </div>
        {/*Mint Button */}
        <button
          className="h-16 w-full
         bg-red-600 text-white rounded-full mt-10
         font-bold"
        >
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  );
}

export default NFTDroppage;
