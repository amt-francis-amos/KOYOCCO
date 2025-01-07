import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../context/AdminContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const url =
        state === "Admin"
          ? "https://koyocco-backend.onrender.com/api/admin/login"
          : "https://koyocco-backend.onrender.com/api/owner/login";

      const response = await axios.post(url, { email, password });
      const { data } = response;

      if (data.success) {
        const token = data.token; // Ensure the backend provides this
        if (token) {
          localStorage.setItem("aToken", token);
          setAToken(token);
          toast.success(`${state} login successful!`);
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-start gap-3 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg"
      >
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
        <button
          type="submit"
          className={`w-full py-2 text-white rounded text-base ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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
      </form>
    </div>
  );
};

export default Login;
