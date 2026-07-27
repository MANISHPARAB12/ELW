import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Navbar} from './Components/Navbar'

import { Home } from "./Pages/Home";
import { MyBorrow } from "./Pages/MyBorrow";
import { Login } from "./Pages/Login";
import { Contact } from "./Pages/Contact";

export const  App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/MyBorrow" element={<MyBorrow />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

