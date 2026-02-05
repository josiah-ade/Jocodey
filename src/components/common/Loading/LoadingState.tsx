import { FaSpinner } from "react-icons/fa";

function LoadingState() {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center text-center bg-bg1 border-border1 p-6 rounded-xl shadow-lg">
      <FaSpinner className="animate-spin w-12 h-12 font-semibold text-gray-text" />
    </div>
  );
}

export default LoadingState;
