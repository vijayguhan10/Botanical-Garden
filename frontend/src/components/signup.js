import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AuthForm = ({
  isLogin,
  toggleForm,
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <div className="grid gap-8">
    <div
      id="back-div"
      className="bg-gradient-to-r w-[100%] from-[#0cecf0] to-[#bf13b1] rounded-[26px] m-4"
    >
      <div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
        <h1 className="pt-8 pb-6 font-bold text-5xl text-black text-center cursor-default">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <form
          action="#"
          method="post"
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {!isLogin && (
            <div>
              <label htmlFor="name" className="mb-2 dark:text-gray-400 text-lg">
                Name
              </label>
              <input
                id="name"
                className="border bg-[#00000000] dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">
              Email
            </label>
            <input
              id="email"
              className="border bg-[#00000000] dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 dark:text-gray-400 text-lg"
            >
              Password
            </label>
            <input
              id="password"
              className="border bg-[#040b0400] dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r xl:w-96 from-[#0baab6] to-[#9a068e] shadow-lg mt-6 p-3 text-white rounded-lg w-96 hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
          >
            {isLogin ? "LOGIN" : "SIGN UP"}
          </button>
        </form>
        <div className="flex flex-col mt-4 items-center justify-center text-sm">
          <h3>
            <span className="cursor-default dark:text-gray-300">
              {isLogin ? "Don't have an account?" : "Have an account?"}
            </span>
            <NavLink
              className="group text-blue-400 xl:w-96 transition-all duration-100 ease-in-out"
              onClick={toggleForm}
            >
              <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </NavLink>
          </h3>
        </div>
      </div>
    </div>
  </div>
);

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => setIsLogin((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://127.0.0.1:3000/botanicalgarden/newuser/login"
      : "http://127.0.0.1:3000/botanicalgarden/newuser/signup";
    const data = {
      email: email,
      password: password,
    };

    if (!isLogin) {
      data.name = name;
    }

    axios
      .post(url, data)
      .then((response) => {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem("userid", response.data.UserId);
        localStorage.setItem("name",response.data.Name)
        setTimeout(() => {
          navigate("/PlantOverview");
        }, 3000);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again.",
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
      });
  };

  return (
    <div className="w-25 flex font-poppins items-center justify-center min-w-screen min-h-screen">
      <AuthForm
        isLogin={isLogin}
        toggleForm={toggleForm}
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <ToastContainer />
    </div>
  );
};

export default SignUp;
