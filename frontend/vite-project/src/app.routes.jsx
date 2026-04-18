import React from 'react'
import { createBrowserRouter } from "react-router";
import Home from "./features/animeList/pages/Home";
import AboutUs from "./features/animeList/pages/AboutUs";
import AnimeDetail from './features/animeList/pages/AnimeDetail';
import FullList from './features/animeList/pages/FullList';
import NavLayout from './layouts/NavLayout';


export const router = createBrowserRouter([
    {
        // 1. Define the Layout as the top-level parent
        path: "/",
        element: <NavLayout />,
        // 2. Define all pages as children
        children: [
            {
                index: true, // This makes Home the default page for "/"
                element: <Home />
            },
            {
                path: "about-us", // Notice no leading "/" needed for children
                element: <AboutUs />
            },
            {
                path: "anime/:id",
                element: <AnimeDetail />
            },
            {
                path: "full-list",
                element: <FullList />
            }
        ]
    }
]);