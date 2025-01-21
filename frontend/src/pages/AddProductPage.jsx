import { useEffect, useState } from "react"
import { Form } from "../components/Form"
import { handleError, handleSuccess } from "../toastuse"

export const AddProductPage = () => {

  useEffect(() => {
    document.title = "Add-Products"
  }, [])


  const [addProduct, setAddProducts] = useState({
    name: "",
    price: "",
    image: ""
  })

  // logic for dynamic handling the form 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddProducts({
      ...addProduct,
      [name]: value
    })
  }

   //Logic for handling file input through frontend
   const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAddProducts({
      ...addProduct,
      image: file, 
    });
  };
  

  // logic for form submission 
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const { name, price, image } = addProduct;
  
    if (!name || !price || !image) {
      handleError("All fields are required");
      return;
    }
  
    try {
      const url = "http://localhost:8000/api/add-product";
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image); 
  
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      console.log(result);
  
      const { success, message, error } = result;
  
      if (success) {
        handleSuccess(message);
        setAddProducts({ name: "", price: "", image: null });
      } else {
        handleError(message || 'Failed to add product');
      }
    } catch (error) {
      handleError('An error occurred while submitting the form');
    }
  };
  


  return (
    <>
      <Form  addProductValue={addProduct} valueChange={handleChange} formSubmission={handleFormSubmission} filechange={handleFileChange}/>
    </>
  )
}
