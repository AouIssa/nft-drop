import React from "react";

function NFTDroppage() {
  return (
    <div className="flex h-screen flex-col">
      {/*Left side of screen */}
      <div className="bg-gradient-to-br from-cyan-500 to-rose-500">
        <div>
          <img className="w-44 rounded-xl object-cover lg:h-96 lg:w-72" 
          src="https://i.imgur.com/hZ1oaQd.jpg" alt="" />
          <div>
            <h1 className="text-4xl font-bold text-white">
                Aous Ape
            </h1>
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
