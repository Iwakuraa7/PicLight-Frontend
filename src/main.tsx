import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from '../pages/HomePage.tsx'
import ProfilePage from '../pages/ProfilePage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/account",
    element: <ProfilePage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
