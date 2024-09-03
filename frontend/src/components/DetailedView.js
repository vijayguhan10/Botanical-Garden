import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import plantdata from "../Data/plants.json";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  faSeedling,
  faLeaf,
  faInfoCircle,
  faHeartbeat,
  faLink,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const DetailedView = () => {
  let localStorageItem = localStorage.getItem("userid");

  const { plant } = useParams();
  const newplant = plantdata.Plants.find(
    (plants) => plants.plantname === plant
  );
  console.log(plant);

  const [notes, setNotes] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotesVisible, setIsNotesVisible] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/botanicalgarden/GetBookmark/${localStorageItem}/${newplant.plantname}`
        );
        if (response.data.bookmark) {
          setNotes(response.data.bookmark.notes);
          setBookmarkId(response.data.bookmark._id);
        }
      } catch (error) {
        console.error("Failed to fetch bookmark:", error);
      }
    };
    fetchBookmark();
  }, [localStorageItem, newplant.plantname]);

  const handleNotesClick = async () => {
    try {
      let data = {
        bookmarks: notes,
        plantname: newplant.plantname,
      };

      const response = await axios.post(
        "http://127.0.0.1:3000/botanicalgarden/AddBookMarks",
        data
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (response.data.bookmarkId) {
        setBookmarkId(response.data.bookmarkId);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add bookmark. Please try again later.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
    setIsNotesVisible(true);
  };

  const handleEditBookmark = async () => {
    if (!bookmarkId) return;

    try {
      let data = {
        notes: notes,
      };

      const response = await axios.put(
        `http://127.0.0.1:3000/botanicalgarden/EditBookmark/${bookmarkId}`,
        data
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update bookmark. Please try again later.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const AddBookMarkTOplant = async () => {
    try {
      let data = {
        userId: localStorageItem,
        plantname: newplant.plantname,
        commonname: newplant.BotanicalName,
        commonDescription: newplant.commonDescription,
        medicinaltips: newplant.medicinaltips,
        referenceHyperlink: newplant.referenceHyperlink,
        ImageUrl: newplant.ImageUrl,
      };

      const response = await axios.post(
        "http://127.0.0.1:3000/botanicalgarden/plantdata",
        data
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to bookmark plant. Please try again later.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  const handleCloseNotes = () => {
    setIsNotesVisible(false);
  };

  return (
    <div className="min-h-screen w-auto bg-gray-100">
      <div className="flex items-center justify-between bg-[#80d980] p-4 shadow-md">
        <h1 className="text-xl font-matemasie text-black">Ayush Avatars</h1>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <nav
          className={`lg:flex lg:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } absolute lg:static top-16 left-0 w-full lg:w-auto bg-[#80d980] transition-all duration-150 lg:bg-transparent`}
        >
          <a
            href="#back"
            className="block lg:inline text-black hover:underline px-4 py-2"
          >
            Back
          </a>
          <NavLink
            to="/QuizGame"
            className="block lg:inline text-black hover:underline px-4 py-2"
          >
            Take Quiz
          </NavLink>
          <NavLink
            to="/History"
            className="block lg:inline text-black hover:underline px-4 py-2"
          >
            History
          </NavLink>
          <NavLink
            to="/LeaderBoard"
            className="block lg:inline text-black hover:underline px-4 py-2"
          >
            LeaderBoard
          </NavLink>
        </nav>
      </div>
      <div className=" xl:pl-[70%] xl:pt-5">
        <button
          type="button"
          onClick={AddBookMarkTOplant}
          className="text-white bg-gradient-to-br from-[#9be97a] to-[#bc26ad] hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Bookmark It
        </button>
      </div>
      <div
        className={` pl-2 xl:flex flex-row my-8 ${
          isMenuOpen ? "mt-[40%]" : "xl:mt-0"
        }`}
      >
        <div className="pl-4 pr-4 xl:pt-10 text-xl font-josafin">
          <img
            className="w-full h-auto max-w-3xl rounded-lg shadow-lg"
            src={newplant.ImageUrl}
            alt={`${newplant.plantname} Plant`}
          />
        </div>

        <div className=" pl-11 xl:pl-10 xl:pt-10 text-xl font-josafin space-y-4">
          <h1 className=" font-semibold flex items-center pt-10 text-xl font-josafin">
            <FontAwesomeIcon
              icon={faSeedling}
              className="text-green-500 mr-2"
            />
            Plant Name: {newplant.plantname}
          </h1>
          <h1 className=" font-semibold flex items-center pt-10 text-xl font-josafin">
            <FontAwesomeIcon icon={faLeaf} className="text-green-500 mr-2" />
            Botanical Name: {newplant.BotanicalName}
          </h1>
          <h1 className=" font-semibold flex items-center pt-10 text-xl font-josafin">
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-green-500 mr-2"
            />
            Common Description: {newplant.commonDescription}
          </h1>
          <h1 className="font-semibold flex items-center pt-10 text-xl font-josafin">
            <FontAwesomeIcon
              icon={faHeartbeat}
              className="text-green-500 mr-2"
            />
            Medicinal Tips: {newplant.medicinaltips}
          </h1>
          <a
            href={newplant.referenceHyperlink}
            className="font-semibold flex items-center pt-10 text-xl font-josafin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLink} className="text-blue-500 mr-2" />
            Reference
          </a>
          <h1 className="font-semibold w-52 flex items-center pt-10 text-xl font-josafin">
            Add Notes
          </h1>
          <div className="border w-[40%] rounded-md p-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Add notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              className="mt-2 text-white bg-blue-500 px-4 py-2 rounded-md"
              onClick={handleNotesClick}
            >
              Save Notes
            </button>
            {bookmarkId && (
              <button
                className="mt-2 text-white bg-green-500 px-4 py-2 rounded-md ml-2"
                onClick={handleEditBookmark}
              >
                Edit Bookmark
              </button>
            )}
          </div>
        </div>
      </div>

      {isNotesVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Notes</h2>
              <button onClick={handleCloseNotes}>
                <FontAwesomeIcon icon={faXmark} className="text-red-500" />
              </button>
            </div>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Your notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              className="mt-2 text-white bg-blue-500 px-4 py-2 rounded-md"
              onClick={handleNotesClick}
            >
              Save Notes
            </button>
            {bookmarkId && (
              <button
                className="mt-2 text-white bg-green-500 px-4 py-2 rounded-md ml-2"
                onClick={handleEditBookmark}
              >
                Edit Bookmark
              </button>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default DetailedView;
