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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>
  )
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(<RouterProvider router={router} />);
