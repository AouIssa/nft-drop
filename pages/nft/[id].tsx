import React from "react";

function NFTDroppage() {
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
      <div></div>
    </div>
  );
}

export default NFTDroppage;
