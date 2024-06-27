// src/components/Register.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axiosConfig';
import { Eye, EyeOff, Mail, SquareAsterisk } from "lucide-react";
import { toast } from 'react-toastify';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button } from '@nextui-org/react';

const clientId = '11649722829-v5lj91eqc4g95kobnnr8qf8f620ga748.apps.googleusercontent.com';

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed')
    .min(4, 'Name must be at least 4 characters')
    .max(10, 'Name must be at most 10 characters')
    .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should contain atleast 8 character'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setIsSubmitting(true)
      await axiosInstance.post('register', values);
      toast.success('Registration Successful');
      navigate('/login');
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      const errorMessages = error?.response?.data?.msg.split(',');

      if (Array.isArray(errorMessages)) {
        const combinedMessage = errorMessages.join('\n');
        toast.error(<div style={{ whiteSpace: 'pre-line' }}>{combinedMessage}</div>);
      } else {
        toast.error(errorMessages || 'Registration failed');
      }
    } finally {
      setSubmitting(false);
      setIsSubmitting(false)
    }
  };

  const toggleVisibility  = ()=>{
    setPasswordVisible(!passwordVisible);
  }

  const handleGoogleLoginSuccess = (response) => {
    console.log('Response in google auth', response);
    window.location.href = `http://localhost:3000/api/v1/auth/google/callback`;
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google Login Failed:', error);
    toast.error('Google Login failed! Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 duration-300 ease-in-out">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="space-y-6">
              <div className="text-center mb-4">
                <h4 className="text-3xl font-bold text-gray-800">Register</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                  />
                  <ErrorMessage name="name" component="p" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                  />
                
                  <ErrorMessage name="email" component="p" className="mt-2 text-sm text-red-600" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative w-full">
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
                      autoComplete="new-password"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                    />
                      <div className="absolute top-0 left-0 flex items-center justify-center h-[35px] w-9 rounded-lg">
                    <SquareAsterisk className="h-4 w-4 text-gray-500"  />

                    </div>
            
                  </div>
                  <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 transition duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <p className="text-center text-gray-600 mt-4">
                Already a member?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          </Formik>
          <div className="flex items-center justify-center mt-4 mb-4 text-sm">
            <hr className="w-1/3 border-gray-400" />
            <span className="mx-2 text-gray-600">Or</span>
            <hr className="w-1/3 border-gray-400" />
          </div>
          <div className="flex items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;
