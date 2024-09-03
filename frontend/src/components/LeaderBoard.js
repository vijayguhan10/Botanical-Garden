import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaderBoard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchQuizInformation = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/botanicalgarden/LeaderBoardQuizGame"
        );
        setLeaders(response.data);
        console.log("LeaderBoard Information", response.data);
      } catch (error) {
        console.error("Error fetching quiz information:", error);
      }
    };

    fetchQuizInformation();
  }, []);

  return (
    <div className="p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#f30cb9] via-[#00000038] to-indigo-600  min-h-screen flex flex-col items-center">
      <h1 className="font-Silkscreen text-4xl xl:pb-20">
        Welcome to the Ayush Avatars Quiz LeaderBoard
      </h1>
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#5dd40eb8] to-[#b90f0fc4] text-white text-center p-4">
          <h1 className="text-3xl font-Pacifico">Leaderboard</h1>
        </div>
        <div className="p-4">
          <ul className="divide-y divide-gray-200">
            {leaders.map((leader, index) => (
              <li
                key={index}
                className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition ease-in-out duration-150"
              >
                <div className="flex items-center">
                  <span className="text-xl font-semibold text-gray-800">
                    {index+1 }.
                  </span>
                  <span className="ml-4 text-lg text-gray-700">
                    {leader.Name}
                  </span>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {leader.Score} pts
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
