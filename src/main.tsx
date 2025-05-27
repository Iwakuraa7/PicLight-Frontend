import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from '../pages/HomePage.tsx'
import ProfilePage from '../pages/ProfilePage.tsx'
import UploadTestPage from '../pages/UploadTestPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserPhotos from '../pages/UserPhotos.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/account",
    element: <ProfilePage/>
  },
  {
    path: "/test",
    element: <UploadTestPage/>
  },
  {
    path: "/account/:year",
    element: <UserPhotos/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
