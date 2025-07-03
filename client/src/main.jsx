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
import store, { persistor } from './redux/store'
import Layout from '../Layout'
import MemberProfile from './pages/MemberProfile'
import ResetPassword from './Auth/ForgetPassword'
import Notes from './pages/Notes'
import TermsOfUse from './pages/Legal pages/TermOfUse'
import { PersistGate } from "redux-persist/integration/react";
import PrivacyPolicy from './pages/Legal pages/PrivacyPolicy'



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
        element: <ProtectedRoutes component={MemberProfile} />,
      },
      {
        path: "/dashboard/notes",
        element: <ProtectedRoutes component={Notes} />,
        
      }
]
  },
  // legal pages
  {
    path: "/legal/terms-of-use",
    element: <TermsOfUse />,
  },
  {
    path: "/legal/privacy-policy",
    element: <PrivacyPolicy />,
  },
  // auth routes
  {
    path: "/auth/signin",
    element: <SignIn />,
  },
  {
    path: "/auth/signin/verify-user",
    element: <VerifyUser />,
  },
  {
    path: "/auth/forget/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={AppRoutes} />
      <Toaster />
    </PersistGate>
    </Provider>
);
