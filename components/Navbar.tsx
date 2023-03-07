import React from "react";
import { FaBeer, FaEye } from "react-icons/fa";
import { GiSpermWhale, GiHamburgerMenu } from "react-icons/gi";

export default function Navbar({}) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-sky-400 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold cursor-pointer leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              Aous Practice NFT Website
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu />
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="text-lg leading-lg text-white opacity-75"></i>
                  <FaBeer /> <span className="ml-2">Mint</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <FaEye /> <span className="ml-2">View</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <GiSpermWhale />
                  <span className="ml-2">About Us</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
