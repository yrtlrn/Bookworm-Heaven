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
import HomePage from "./page/users/HomePage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layout/AuthLayout.tsx";
import SettingPage from "./page/users/SettingPage.tsx";
import ProfilePage from "./page/users/ProfilePage.tsx";
import LoginPage from "./page/users/LoginPage.tsx";
import SignupPage from "./page/users/SignupPage.tsx";
import BookViewPage from "./page/books/BookViewPage.tsx";
import BookDetailPage from "./page/books/BookDetailPage.tsx";
import SavedBooksPage from "./page/books/SavedBooksPage.tsx";
import NotFoundPage from "./page/NotFoundPage.tsx";

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
      <Route
        path="books/:booktitle"
        element={<BookDetailPage />}
      />

      {/* Private Routes */}
      <Route path="/user" element={<AuthLayout />}>
        <Route path="setting" element={<SettingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="books" element={<SavedBooksPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
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
