import ReactDOM from "react-dom/client";
import "./index.css";

// Router Config Imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store, persistor } from "./app/store.ts";
import { PersistGate } from "redux-persist/integration/react";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages Imports
import HomePage from "./page/users/HomePage.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import SettingPage from "./page/users/SettingPage.tsx";
import ProfilePage from "./page/users/ProfilePage.tsx";
import LoginPage from "./page/users/LoginPage.tsx";
import SignupPage from "./page/users/SignupPage.tsx";
import BookViewPage from "./page/books/BookViewPage.tsx";
import BookDetailPage from "./page/books/BookDetailPage.tsx";
import SavedBooksPage from "./page/books/SavedBooksPage.tsx";
import NotFoundPage from "./page/NotFoundPage.tsx";
import CheckoutPage from "./page/books/CheckoutPage.tsx";

// Other

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
        <Route path="checkout" element={<CheckoutPage />} />
      </Route>

      {/* Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
      <ToastContainer />
    </PersistGate>
  </Provider>
);
