import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Gallery from './Gallery';
import SignUp from './sign-up-form';
import Plant from './PlantPage';
import HomePage from './HomePage';
import AddPage from './AddPage';
import AltCal from './altCal'
import EditPlant from './EditPlant'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/gallery", element: <Gallery /> },
      { path: "/sign-up", element: <SignUp /> },
      { path: "/plant/:plantId", element: <Plant /> },
      { path: "/HomePage", element: <HomePage /> },
      { path: "/addPage", element: <AddPage /> },
      { path: "/altCal", element: <AltCal /> },
      { path: "/plant/:plantId/edit", element: <EditPlant /> },



      { index: true, element: <HomePage /> },
    ]
  },
], {
  basename: import.meta.env.BASE_URL
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);