import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../toastuse";

export const Box = ({ data }) => { // Passing setData to handle state update after deletion

  const onDelete = async (pid) => {

    if (!pid) {
      handleError("Id is missing")
    }

    const url = `http://localhost:8000/api/product/${pid}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
      }
      else if (!success) {
        handleError(message)
      } else {
        handleError(error)
      }

    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <>
      {data.length > 0 ? (
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 p-2 mt-24">
          {data.map((product, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center border rounded-lg px-4 py-2 shadow-md bg-gray-50 hover:shadow-lg hover:-translate-y-2 duration-1000"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-auto w-auto object-cover mb-4 rounded-lg"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 text-red-600 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => onDelete(product._id)} // Trigger onDelete with product ID
              >
                <path
                  fill="currentColor"
                  d="M15.3 9.3a1 1 0 1 0-1.4-1.4L12 9.6 10.1 7.9a1 1 0 1 0-1.4 1.4l1.6 1.6-1.6 1.6a1 1 0 0 0 1.4 1.4L12 12.4l1.9 1.9a1 1 0 0 0 1.4-1.4l-1.6-1.6 1.6-1.6ZM6.5 21a2 2 0 0 1-2-2V7H3a1 1 0 1 1 0-2h4V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h4a1 1 0 1 1 0 2h-1.5v12a2 2 0 0 1-2 2h-11ZM9 4v1h6V4H9Zm8.5 3h-11v12h11V7Z"
                />
              </svg>
              <p className="text-lg  text-gray-800">{product.name}</p>
              <p className="font-medium">{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-semibold text-xl font-serif text-center flex items-center justify-center">
          Sorry! no data in our products list currently
        </p>
      )}
      <ToastContainer />
    </>
  );
};
