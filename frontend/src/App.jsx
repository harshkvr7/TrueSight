import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Main from './pages/Main';
import About from './pages/About';
import Feedback from './pages/Feedback';
import MultiImageUpload from './pages/MultiFile';
import Register from './pages/Register';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <Navbar/>
      <Home />
      <Footer />
    </>,
  },
  {
    path: "/try",
    element:<>
      <Navbar/>
      <Main />
      <Footer/>
    </>
  },
  {
    path: "/about",
    element:<>
      <Navbar/>
      <About />
      <Footer/>
    </>
  },
  {
    path: "/feedback",
    element:<>
      <Navbar/>
      <Feedback />
      <Footer/>
    </>
  },
  {
    path: "/try/multi",
    element: <>
      <Navbar/>
      <MultiImageUpload />
      <Footer />
    </>,
  },
  {
    path: "/register",
    element: <>
      <Navbar/>
      <Register />
      <Footer />
    </>,
  },
  {
    path: "/login",
    element: <>
      <Navbar/>
      <Login />
      <Footer />
    </>,
  },
]);

function App() {
  return (
    <div className='app'>
      <div className="app-container">
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App;

