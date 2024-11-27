import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";
import RootLayout from "./pages/RootLayout.jsx";
import HomePage from "./pages/Home.jsx";
import MenPage from "./pages/Men.jsx";
import FemalePage from "./pages/Female.jsx";
import Brands from "./pages/Brands.jsx";
import Promotion from "./pages/Promotion.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "men",
        element: <MenPage />,
      },
      {
        path: "female",
        element: <FemalePage />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      { path: "promotion", element: <Promotion /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
