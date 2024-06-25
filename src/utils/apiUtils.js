
import axiosInstance from './axiosConfig';

export const fetchUser = async () => {
  try {

    const response = await axiosInstance.get('me'); // Adjust URL as per your backend API
    return response.data.user; // Assuming the response contains a 'user' object with cartItems
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Handle or rethrow the error as needed
  }
};
