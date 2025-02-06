import { Route, Routes } from "react-router";
import Layout from "./Components/Layout/Layout.jsx";
import AuthRoute from "./Components/AuthRoute/AuthRoute.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import Login from "./Components/Login/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Products from "./Components/Products/Products.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route
          index
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="forget-password"
          element={
            <AuthRoute>
              <ForgetPassword />
            </AuthRoute>
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="product-details/:productId"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="allorders"
          element={
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="brands"
          element={
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
