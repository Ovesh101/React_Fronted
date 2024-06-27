import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; 
import { Button } from "@nextui-org/react";
import { Eye, EyeOff, Mail, SquareAsterisk } from "lucide-react";
const clientId = "11649722829-v5lj91eqc4g95kobnnr8qf8f620ga748.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password is required 8 character'),
  });


  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post('login', { email: values.email, password: values.password });
      toast.success('Login Successfully');
      navigate('/product');
    } catch (error) {
      setIsSubmitting(false)
      const errorMessages = error?.response?.data?.msg.split(',');

      if (Array.isArray(errorMessages)) {
        const combinedMessage = errorMessages.join('\n'); // Joining with new line character
        toast.error(<div style={{ whiteSpace: 'pre-line' }}>{combinedMessage}</div>);
      } else {
        toast.error(errorMessages || 'Login failed');
      }
    } finally {
      setSubmitting(false);
      setIsSubmitting(false)
    }
  };
  const toggleVisibility = ()=>{
    setPasswordVisible(!passwordVisible)
  }

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
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="space-y-6">
              <div className="text-center mb-4">
                <h4 className="text-3xl font-bold text-gray-800">Login</h4>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                 
                  <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                  <div className="absolute top-0 right-0 flex items-center justify-center max-h-[40] w-9 rounded-xl ">
                    {passwordVisible ? (
                    <Eye className='' onClick={toggleVisibility} />
                   ):(
                    <EyeOff className='' onClick={toggleVisibility} />
                   )}

                    </div>
               
                    <Field
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
               
                   
                
                  </div>
                  <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300"
              >
                
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <p className="text-center text-gray-600">
                Not a member yet?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </Form>
          </Formik>
          <p className="text-center text-gray-600">
            <Link to="/forgetPassword" className="text-blue-500 hover:underline">
              Forget Password?
            </Link>
          </p>
          <div className="flex items-center justify-center mt-4 mb-4 text-sm">
            <hr className="w-1/3 border-gray-400" />
            <span className="mx-2 text-gray-600">Or</span>
            <hr className="w-1/3 border-gray-400" />
          </div>
          <div className="flex items-center justify-center">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} cookiePolicy={'single_host_origin'} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
