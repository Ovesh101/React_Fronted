// ProductLayout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import axiosInstance from '../utils/axiosConfig';

const ProductLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {

      console.log("cookie" , document.cookie);
   
      const response = await axiosInstance.post(
        'update-cart',
        { productId: product._id },
        
      );

      if (response.status === 200) {
        setUser(response.data.user);
        toast.success(response.data.msg);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong');
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
   

        const response = await axiosInstance.get('product');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Something went wrong');
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
     

        const response = await axiosInstance.get('me');
        setUser(response.data.user);
        
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Something went wrong');
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Navbar cartCount={user ? user.cartItems.length : 0} username={user} />
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card shadow="sm" key={product._id}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={product.title}
                className="w-full object-cover h-[200px] sm:h-[250px]"
                src={product.image}
              />
            </CardBody>
            <CardFooter className="flex flex-col justify-around">
            <div className="flex flex-col   ">
                <b className="text-gray-900 font-semibold max-w-[200px] max-sm:max-w-[150px] text-lg line-clamp-1 cursor-pointer " onClick={() => navigate(`/product/${product._id}`)}>{product.title}</b>
                <p className="text-gray-700 text-center">${product.price}</p>
                <button
                className={`mt-2 ${user && user.cartItems.includes(product._id) ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onClick={() => handleAddToCart(product)}
              >
                {user && user.cartItems.includes(product._id) ? 'Added' : 'Add to Cart'}
              </button>
              </div>
            
            </CardFooter>
          </Card>
        ))}
      </div>
      <Footer/>
    </div>
    
  );
};

export default ProductLayout;
