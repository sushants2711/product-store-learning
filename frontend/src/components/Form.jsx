import { ToastContainer } from "react-toastify";

export const Form = ({ addProductValue, valueChange, formSubmission, fileChange }) => {
    return (
        <form onSubmit={formSubmission}>
            <div>
                <label htmlFor="name">Product Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={addProductValue.name}
                    onChange={valueChange}

                />
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={addProductValue.price}
                    onChange={valueChange}

                />
            </div>

            <div>
                <label htmlFor="image">Image URL:</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={fileChange} />
            </div>

            <button type="submit">Add Product</button>
            <ToastContainer />
        </form>
        
    );
};
