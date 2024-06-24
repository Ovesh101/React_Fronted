// ProductLayout.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';

const ProductLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      };

      const response = await axios.post(
        'http://localhost:3000/api/v1/update-cart',
        { productId: product._id },
        config
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
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3000/api/v1/product', config);
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.msg || 'Something went wrong');
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:3000/api/v1/me', config);
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
          <Card shadow="sm" key={product._id} isPressable onPress={() => navigate(`/product/${product._id}`)}>
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
            <div className="flex flex-col mb-2 t ">
                <b className="text-gray-900 font-medium text-sm line-clamp-2 ">{product.title}</b>
                <p className="text-gray-700">${product.price}</p>
              </div>
              <button
                className={`mt-2 ${user && user.cartItems.includes(product._id) ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                onClick={() => handleAddToCart(product)}
              >
                {user && user.cartItems.includes(product._id) ? 'Added' : 'Add to Cart'}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
    
  );
};

export default ProductLayout;
