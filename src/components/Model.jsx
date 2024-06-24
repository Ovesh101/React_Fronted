import { useSelector } from "react-redux";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const products = useSelector(state => state.product.products);
  if (!isOpen || !products) return null;

  const totalPrice = products.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Order Summary</h2>
        {products.length > 0 ? (
          <ul className="space-y-4">
            {products.map((item) => (
              <li key={item.productId} className="flex justify-between items-center">
                <div className="text-left">
                  <span className="font-bold text-gray-900">{item.title}</span>
                  <p className="text-gray-600">{item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <span className="text-gray-900 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No items in order summary.</p>
        )}
        <div className="mt-6 border-t pt-4">
          <p className="text-xl font-bold text-right text-gray-900">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
