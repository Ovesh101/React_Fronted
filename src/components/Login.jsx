import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; 
const clientId = "11649722829-v5lj91eqc4g95kobnnr8qf8f620ga748.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password.length < 3) {
      toast.error("Password is too short");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axiosInstance.post(`login`, { email, password });
      console.log("response", response);
    
      toast.success("Login Successfully");
      navigate("/product");
    } catch (error) {
      const errorMessages = error?.response?.data?.msg.split(",");

      if (Array.isArray(errorMessages)) {
        const combinedMessage = errorMessages.join("\n"); // Joining with new line character
        toast.error(
          <div style={{ whiteSpace: "pre-line" }}>{combinedMessage}</div>
        );
      } else {
        toast.error(errorMessages || "Login failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleGoogleLoginSuccess = (response) => {
    console.log("Response in google auth" , response);
    window.location.href = `http://localhost:3000/api/v1/auth/google/callback`;
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
    toast.error("Google Login failed! Please try again.", "error");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-3xl font-bold text-gray-800">Login</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-gray-600">
            Not a member yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
        <div className="flex items-center justify-center mt-4 mb-4 text-sm">
          <hr className="w-1/3 border-gray-400" />
          <span className="mx-2 text-gray-600">Or</span>
          <hr className="w-1/3 border-gray-400" />
        </div>
        <div className="flex items-center justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
       
      </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
