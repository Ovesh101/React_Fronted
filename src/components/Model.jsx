import { useDispatch, useSelector } from "react-redux";

const Modal = ({ isOpen, onClose,  onConfirm }) => {
    
   
    const products = useSelector(state => state.product.products);
    if (!isOpen || !products) return null;
  
    const totalPrice = products.reduce((total, item) => total + item.price * item.quantity, 0);
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {products.length > 0 ? (
            <ul>
              {products.map((item) => (
                <li key={item.productId} className="mb-2">
                  <span className="font-bold">{item.title}</span> - {item.quantity} x ${item.price} = ${item.price * item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in order summary.</p>
          )}
          <p className="font-bold mt-4">Total: ${totalPrice}</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  