const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
      <div className="flex items-center justify-center align-middle">
        <div className="bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-md flex flex-col items-center relative">{children}
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;