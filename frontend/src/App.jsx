import { Routes, Route, Navigate } from "react-router-dom"
import { AllProducts } from "./pages/AllProducts"
import { AddProductPage } from "./pages/AddProductPage"
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/add" element={<AddProductPage />} />
      </Routes>

    </>
  )
}

export default App
