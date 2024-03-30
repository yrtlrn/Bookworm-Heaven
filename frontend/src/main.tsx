import ReactDOM from "react-dom/client";
import "./index.css";

// Router Config Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages Imports
import HomePage from "./page/HomePage.tsx";
import MainLayout from "./layout/MainLayout.tsx";

// Redux Toolkit
import { Provider } from "react-redux";
import store from "./app/store.ts";
import LoginPage from "./page/LoginPage.tsx";
import SignupPage from "./page/SignupPage.tsx";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      {/* Public Routes */}
      <Route index element={<HomePage />} />
      <Route path="/log-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
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
