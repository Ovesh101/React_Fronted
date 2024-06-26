import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; 
import { toast } from "react-toastify";
import {Button} from "@nextui-org/react";

const clientId = "11649722829-v5lj91eqc4g95kobnnr8qf8f620ga748.apps.googleusercontent.com";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
       await axiosInstance.post("register", formData);

      toast.success("Registration Successful");
      navigate("/login");
    } catch (error) {
      const errorMessages = error?.response?.data?.msg.split(",");
      

      if (Array.isArray(errorMessages)) {
        console.log("Array in error");
        const combinedMessage = errorMessages.join("\n"); // Joining with new line character
        toast.error(
          <div style={{ whiteSpace: "pre-line" }}>  {combinedMessage}</div>
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-4">
            <h4 className="text-3xl font-bold text-gray-800">Register</h4>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
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
                id="password"
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
              />
              <Button
              color="primary" variant="flat" size="sm"
              type="button"
              className="toggle-password mt-4"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </Button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already a member?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
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

export default Register;
