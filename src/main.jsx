import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calendar from './Calendar';
import App from "./App.jsx";
import AddPlant from "./AddPlant"
import HomePage from "./HomePage"
import PlantPage from './PlantPage';
import WelcomePage from './welcomePage';
import Home from './home';
import Gallery from './Gallery'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/calendar", element: <Calendar /> },
      { path: "/addPlant", element: <AddPlant /> },
      { path: "/plant/:plantId", element: <PlantPage /> },
      { path: "/gallery", element: <Gallery /> },
      { path: "/welcomePage", element: <WelcomePage /> },
      { path: "/home", element: <HomePage /> },
      { index: true, element: <Home /> },
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