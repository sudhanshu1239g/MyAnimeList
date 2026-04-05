import { RouterProvider } from "react-router";
import {router} from './app.routes.jsx'

import React from 'react'

const App = () => {
  return (
    <div>
        <RouterProvider router={router}></RouterProvider>
      
    </div>
  )
}

export default App


