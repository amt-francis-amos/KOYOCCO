import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const response = await axios.post(
          "https://koyocco-backend.onrender.com/api/admin/login",
          { email, password }
        );

        const { data } = response;

        if (data.success) {
          const token = data.token; // Ensure this matches backend response
          if (token) {
            localStorage.setItem("aToken", token);
            setAToken(token);
            toast.success("Login successful!");
          }
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Unable to login. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col items-start gap-3 mx-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold mx-auto">
            <span className="text-red-500">{state}</span> Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              className="border border-[#DADADA] rounded w-full outline-none p-2 mt-1"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              className="border border-[#DADADA] rounded w-full outline-none p-2 mt-1"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="bg-red-500 w-full py-2 text-white rounded text-base">
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Property Owner Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Property Owner")}
              >
                Click Here
              </span>
            </p>
          ) : (
            <p>
              Admin Login?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click Here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
