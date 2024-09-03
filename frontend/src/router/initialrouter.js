import React from "react";
import { Route, Routes } from "react-router-dom"; // Use Routes instead of Router
import SignUp from "./../components/signup";
import PlantOveriview from "./../components/PlantOveriview";
import QuizGame from "../components/QuizGame";
import DetailedView from "../components/DetailedView";
import History from "../components/History";
import LeaderBoard from "../components/LeaderBoard";
const InitialRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/PlantOverview" element={<PlantOveriview />} />
      <Route path="/DetailedView/:plant" element={<DetailedView />} />
      <Route path="/QuizGame" element={<QuizGame />} />
      <Route path="/History" element={<History />} />
      <Route path="/LeaderBoard" element={<LeaderBoard />} />
    </Routes>
  );
};

export default InitialRouter;
