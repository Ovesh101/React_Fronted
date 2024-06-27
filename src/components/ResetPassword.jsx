// src/components/ResetPassword.js
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axiosConfig';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      //Password must contain at least one uppercase letter, one lowercase letter, and one number
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axiosInstance.put(`/resetPassword/${resetToken}`, {
        password: values.password,
      });
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error resetting password');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Reset Password</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="password" component="p" className="mt-2 text-sm text-red-600" />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
