import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import plantdata from "../Data/plants.json";
const PlantOverview = () => {
  return (
    <div className=" bg-gradient-to-r from-[#d5b32e] to-[#1dc4ea]">
      <Header />
      <h1 className=" xl:rounded-xl p-[3%] xl:pl-[9%] sm:text-xl sm:pl-[7%] font-Orbition xl:text-4xl font-bold">
        Welcome to the plant Collections
      </h1>
      <div className=" xl:rounded-lg xl:grid xl:grid-cols-3 xl:gap-10 sm:pl-0  ml-3 mr-3 flex flex-col gap-4   xl:pl-[1%] ">
        {plantdata.Plants.map((plant) => (
          <div
            key={plant.plantname}
            className=" xl:rounded-lg sm:pl-96 xl:h-[80%]  md:pl-0    xl:w-[80%] sm:w-20 md:w-1/3  shadow-md  bg-white"
          >
            <img
              className="w-[100%] h-[60%]"
              src={plant.ImageUrl}
              alt={plant.plantname}
            />
            <div className="bg-[#b5f1f6]">
              <div>
                <h1 className="font-Righteous font-thin text-2xl pl-5 pb-5">
                  Common Name: {plant.plantname}
                </h1>
                <h1 className="font-Righteous text-2xl pl-5">
                  Botanical Name: {plant.BotanicalName}
                </h1>
              </div>
              <div className="flex justify-center pb-3 ">
                <NavLink
              
                  to={`/DetailedView/${plant.plantname}`}
                  className="bg-black xl:rounded-xl font-Orbition hover:bg-blue-700 text-white font-bold py-2 px-4 sm:w-28 xl:w-52  text-center"
                >
                  View Plant
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantOverview;
