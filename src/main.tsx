import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from '../pages/HomePage.tsx'
import ProfilePage from '../pages/ProfilePage.tsx'
import UploadTestPage from '../pages/UploadTestPage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserPhotos from '../pages/UserPhotos.tsx'
import SignInPage from '../pages/SignInPage.tsx'
import SignUpPage from '../pages/SignUpPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/account/:username",
    element: <ProfilePage/>
  },
  {
    path: "/test",
    element: <UploadTestPage/>
  },
  {
    path: "/account/:username/:year",
    element: <UserPhotos/>
  },
  {
    path: "/signin",
    element: <SignInPage/>
  },
  {
    path: "/signup",
    element: <SignUpPage/>
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
