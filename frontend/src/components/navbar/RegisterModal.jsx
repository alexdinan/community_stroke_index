
const RegisterModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        {/* Replace with actual form */}
        <p>Registration form goes here.</p>
        <button onClick={onClose} className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );

export default RegisterModal;