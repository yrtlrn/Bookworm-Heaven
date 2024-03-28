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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
