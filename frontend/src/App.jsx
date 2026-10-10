import { BrowserRouter, Routes, Route , Navigate} from "react-router-dom";

import {Navbar} from './Components/Navbar'
import {ProductDetails} from "./Components/ProductDetails"
import { Card } from "./Components/Card";

import { Home } from "./Pages/Home";
import { MyBorrow } from "./Pages/MyBorrow";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Contact } from "./Pages/Contact";

export const  App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/MyBorrow" element={<MyBorrow />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Contact" element={<Contact />} />

        <Route path="/" element={<Card />} />
        <Route path="/book/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

