import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faLeaf,
  faInfoCircle,
  faHeartbeat,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const History = () => {
  const [collectedData, setCollectedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/botanicalgarden/plantdata/fetch",
          {
            params: { userId: localStorage.getItem("userid") },
          }
        );
        setCollectedData(response.data.PlantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="flex justify-center mx-auto items-center h-3 mt-2 mb-10 w-[70%] bg-[#b5e1a5] p-6">
        <h1 className=" font-SUSE font-bold text-2xl">View Plant History</h1>
      </div>
      <div className="flex-col w-[90%] justify-center items-center   mx-auto">
        {collectedData.map((plant, index) => (
          <div key={index} className="w-full   mb-8">
            <div className=" flex shadow-2xl">
              <img
                className="p-4 w-[30%] h-[50%]"
                src={
                  plant.ImageUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUGQP5Vg2O4GpyHI4z0un13WnD7_OX0lISlA&s"
                }
                alt="viewplant"
              />
              <div className="pl-11 xl:pl-20 xl:pt-1 text-xl font-josafin space-y-4 w-[70%]">
                <div className="flex">
                  <div>
                    <h1 className="font-semibold flex items-center pt-10 text-xl font-josafin">
                      <FontAwesomeIcon
                        icon={faSeedling}
                        className="text-green-500 mr-2"
                      />
                      Plant Name: {plant.plantname}
                    </h1>
                    <h1 className="font-semibold flex items-center pt-10 text-xl font-josafin">
                      <FontAwesomeIcon
                        icon={faLeaf}
                        className="text-green-500 mr-2"
                      />
                      Botanical Name: {plant.commonname}
                    </h1>
                  </div>

                  <div className="bg-gradient-to-r from-[#0cacd0b3] to-[#c53fa89e] shadow-xl w-96 h-20 ml-20">
                    <h1 className="text-white">
                      <span className="bg-[#000000c5]">Bookmarks</span>:{" "}
                      {plant.BookMarks || "No bookmarks available"}
                    </h1>
                  </div>
                </div>

                <h1 className="font-semibold flex items-center pt-10 text-xl font-josafin">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-green-500 mr-2"
                  />
                  Common Description: {plant.commonDescription}
                </h1>
                <h1 className="font-semibold flex items-center pt-10 text-xl font-josafin">
                  <FontAwesomeIcon
                    icon={faHeartbeat}
                    className="text-green-500 mr-2"
                  />
                  Medicinal Tips: {plant.medicinaltips}
                </h1>
                <a
                  href={plant.referenceHyperlink || "#"}
                  className="font-semibold flex items-center pt-10 text-xl font-josafin"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    className="text-blue-500 mr-2"
                  />
                  Reference
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
