import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ViewBooks from "./ViewBooks";
import ProfilePage from "./ProfilePage";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";

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
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
