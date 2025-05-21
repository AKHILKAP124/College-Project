import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Profile from './pages/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { Toaster } from 'react-hot-toast'
import VerifyUser from './Auth/VerifyUser'
import Dashboard from './pages/Dashboard'
import ProjectPage from './pages/ProjectPage'
import { Provider } from 'react-redux'
import store from './redux/store'
import Layout from '../Layout'
import MemberProfile from './pages/MemberProfile'






const AppRoutes = createBrowserRouter([
  
  {
    path: "/",
    element: <Layout />,
    children: [
      {
    path: "/dashboard/tasks-All-Activities&",
    element: <ProtectedRoutes component={Dashboard} />,
  },
  {
    path: "/dashboard/Projects-&/:id",
    element: <ProtectedRoutes component={ProjectPage} />,
      },
      {
        path: "/user/profile",
        element: <ProtectedRoutes component={Profile} />,
      },
      {
        path: "/members/profile/:id",
        element: <MemberProfile />,
      }
]
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signin/verify-user",
    element: <VerifyUser />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={AppRoutes} />
      <Toaster />
    </Provider>
);
