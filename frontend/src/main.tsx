import ReactDOM from "react-dom/client";
import "./index.css";

// Router Config Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Redux Toolkit
import { Provider } from "react-redux";
import store from "./app/store.ts";

// Toastify
import { ToastContainer } from "react-toastify";

// Pages Imports
import HomePage from "./page/HomePage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layout/AuthLayout.tsx";
import SettingPage from "./page/SettingPage.tsx";
import ProfilePage from "./page/ProfilePage.tsx";
import LoginPage from "./page/LoginPage.tsx";
import SignupPage from "./page/SignupPage.tsx";
import BookViewPage from "./page/BookViewPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Public Routes */}
      <Route index element={<HomePage />} />
      <Route path="log-in" element={<LoginPage />} />
      <Route path="sign-up" element={<SignupPage />} />
      <Route
        path="books/search"
        element={<BookViewPage />}
      />

      {/* Private Routes */}
      <Route path="/user" element={<AuthLayout />}>
        <Route path="setting" element={<SettingPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>
);
