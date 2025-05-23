import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ViewBooks from "./ViewBooks";
import ProfilePage from "./ProfilePage";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import AddBook from './AddBook';
import Checkout from './Checkout';
import EditBook from './EditBook';
import MyBooks from './MyBooks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ViewBooks />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/edit-book" element={<EditBook />} />
          <Route path="/my-books" element={<MyBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);