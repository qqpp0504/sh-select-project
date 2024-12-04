import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { queryClient } from "./util/http.js";
import RootLayout from "./pages/RootLayout.jsx";
import BrandsPage from "./pages/Brands.jsx";
import PromotionPage from "./pages/Promotion.jsx";
import ProductsPage from "./pages/Products.jsx";
import ProductCategoryPage from "./pages/ProductCategoryPage.jsx";
import ProductsRoot from "./pages/ProductsRoot.jsx";
import store from "./store/index.js";

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
      { path: "promotion", element: <PromotionPage /> },
      {
        path: "products",
        element: <ProductsRoot />,
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":category", element: <ProductCategoryPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
