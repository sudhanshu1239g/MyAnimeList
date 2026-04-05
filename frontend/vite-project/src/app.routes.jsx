import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from "./features/animeList/pages/Home";
import AboutUs from "./features/animeList/pages/AboutUs";
import AnimeDetail from './features/animeList/pages/AnimeDetail';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/about-us",
        element: <AboutUs />
    },
    {
        path: "/anime/:id",
        element: <AnimeDetail />
    }
]);