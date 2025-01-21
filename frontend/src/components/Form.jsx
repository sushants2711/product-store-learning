import { ToastContainer } from "react-toastify";

export const Form = ({ addProductValue, valueChange, formSubmission, filechange }) => {
  return (
    <>
    <h1 className="text-center text-2xl font-semibold font-serif mt-20 ">Add New Product</h1>
      <div className="max-w-[600px] min-h-[200px] mx-auto bg-gradient-to-br from-blue-400 to-white rounded-lg shadow-lg p-6 mt-4 border-2 border-black">
        <form
          onSubmit={formSubmission}
          className="flex flex-col justify-center items-center py-2 mx-2 "
        >
          <div className="w-full ">
            <div className="py-2 px-2">
              <label
                htmlFor="name"
                className="text-xl py-1 block font-semibold text-white"
              >
                Product Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={addProductValue.name}
                onChange={valueChange}
                className="w-full py-2 px-3 rounded-md ring-2 ring-blue-700 outline-none"
              />
            </div>

            <div className="py-2 px-2">
              <label
                htmlFor="price"
                className="text-xl py-1 block font-semibold text-white"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={addProductValue.price}
                onChange={valueChange}
                className="w-full py-2 px-3 rounded-md ring-2 ring-blue-700 focus:ring-4 focus:ring-blue-400 transition duration-300 outline-none"
              />
            </div>

            <div className="py-2 px-2">
              <label
                htmlFor="image"
                className="text-xl py-1 block font-semibold text-white"
              >
                Image URL:
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={filechange}
              
                className="w-full py-2 px-3 rounded-md ring-2 ring-blue-700 focus:ring-4 focus:ring-blue-400 transition duration-300 outline-none"
              />
            </div>

            <div className="py-4 flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 hover:-translate-y-1 transition duration-1000 transform w-full"
              >
                Add Product
              </button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};
