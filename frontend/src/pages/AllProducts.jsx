import { useEffect, useState } from "react"
import { Box } from "../components/Box"
import { handleError } from "../toastuse";

export const AllProducts = () => {

  const [allProducts, setAllproducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const url = "http://localhost:8000/api/products";
      const response = await fetch(url);

      if (!response.ok) {
        handleError("You are not authorized");
      }

      const result = await response.json();
      const { data } = result;
      setAllproducts(data);
      
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    fetchProduct()
  }, [])

  useEffect(() => {
    document.title = "AllProducts"
  })


  return (
    <>
      {
        isLoading ? (
          <p>Loading Products ....</p>
        ) : (
          <Box data={allProducts} />
        )
      }

    </>
  )
}
