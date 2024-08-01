import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from './Calendar';
import App from "./App.jsx";
import AddPlant from "./AddPlant"
import Plant from './PlantWorking';
import WelcomePage from './welcomePage';
import HomePage from './HomePage';
import Gallery from './Gallery';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/calendar", element: <Calendar /> },
      { path: "/addPlant", element: <AddPlant /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/welcomePage", element: <WelcomePage /> },
      { path: "/plant/:plantId", element: <Plant /> },
      { path: "/HomePage", element: <HomePage /> },
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