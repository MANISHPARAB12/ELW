
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "./Components/Navbar";
import { PrivateRoute } from "./Components/PrivateRoute";

import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { ProductDetails } from "./Components/ProductDetails";
import { MyBorrow } from "./Pages/MyBorrow";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/MyBorrow" element={<MyBorrow />} />

          {/* Book Details */}
          <Route
            path="/book/:id"
            element={<ProductDetails />}
          />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

