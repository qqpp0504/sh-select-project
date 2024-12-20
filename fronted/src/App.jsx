import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./util/http.js";
import RootLayout from "./pages/RootLayout.jsx";
import BrandsPage from "./pages/Brands.jsx";
import ProductsPage from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/Cart.jsx";
import CheckoutPage from "./pages/Checkout.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const MenPage = lazy(() => import("./pages/Men.jsx"));
const FemalePage = lazy(() => import("./pages/Female.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "men",
        element: (
          <Suspense fallback={null}>
            <MenPage />
          </Suspense>
        ),
      },
      {
        path: "female",
        element: (
          <Suspense fallback={null}>
            <FemalePage />
          </Suspense>
        ),
      },
      {
        path: "brands",
        element: <BrandsPage />,
      },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          {
            path: ":slug",
            element: <ProductDetail />,
          },
        ],
      },
      { path: "cart", element: <CartPage /> },
    ],
  },
  { path: "checkout", element: <CheckoutPage /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
