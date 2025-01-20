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
    image: null
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

   // Logic for handling file input through frontend
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
      handleError("All fields are required")
    }

    try {
      const url = "http://localhost:8000/api/add-product"
      
      const resposnse = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addProduct)
      })

      const result = await resposnse.json();
      console.log(result);

      const { success, message, error, cloudinaryError } = result;

      if (success) {
        handleSuccess(message)
        setAddProducts({
          name: "",
          price: "",
          image: null
        });

      } else if (!success) {
        handleError(message)

      } else if (error) {
        handleError(error)

      } else {
        handleError(cloudinaryError)
      }
    } catch (error) {
      handleError(error)
    }
  }


  return (
    <>
      <Form  addProductValue={addProduct} valueChange={handleChange} formSubmission={handleFormSubmission} fileChange={handleFileChange}/>
    </>
  )
}
