import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { queryClient } from "./util/http.js";
import RootLayout from "./pages/RootLayout.jsx";
import BrandsPage from "./pages/Brands.jsx";
import ProductsPage from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/Cart.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import MembershipPage from "./pages/Membership.jsx";
import AccountsPage from "./pages/Accounts.jsx";
import RegisterPage from "./pages/Register.jsx";
import AccountsRootLayout from "./pages/AccountsRootLayout.jsx";
import LoginPage from "./pages/Login.jsx";
import HelpPage from "./pages/Help.jsx";
import BannerBarLayout from "./pages/BannerBarLayout.jsx";
import HelpLayout from "./pages/HelpLayout.jsx";
import HelpQuestionPage from "./components/help/HelpQuestion.jsx";
import SearchQuestions from "./components/help/SearchQuestions.jsx";
import FavoritesPage from "./pages/Favorites.jsx";
import ProtectedRoute from "./components/util/ProtectedRoute.jsx";
import OrderPage from "./pages/Order.jsx";
import OrderDetailPage from "./pages/OrderDetail.jsx";
import MemberRootLayout from "./pages/MemberRootLayout.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import MemberInfo from "./components/member/MemberInfo.jsx";

const basename = import.meta.env.VITE_PUBLIC_URL;

const HomePage = lazy(() => import("./pages/Home.jsx"));
const MenPage = lazy(() => import("./pages/Men.jsx"));
const WomenPage = lazy(() => import("./pages/Women.jsx"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "help",
          element: <HelpLayout />,
          children: [
            { index: true, element: <HelpPage /> },
            { path: "search/:searchTerm", element: <SearchQuestions /> },
            { path: ":questionId", element: <HelpQuestionPage /> },
          ],
        },
        {
          path: "favorites",
          element: (
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "member",
          element: (
            <ProtectedRoute>
              <MemberRootLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <MemberInfo /> },
            { path: "orders", element: <OrderPage /> },
            { path: "orders/:orderId", element: <OrderDetailPage /> },
          ],
        },

        {
          path: "/",
          element: <BannerBarLayout />,
          children: [
            { path: "*", element: <NotFoundPage /> },
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
                  <WomenPage />
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
            { path: "membership", element: <MembershipPage /> },
          ],
        },
      ],
    },
    { path: "checkout", element: <CheckoutPage /> },
    {
      path: "accounts",
      element: <AccountsRootLayout />,
      children: [
        { index: true, element: <AccountsPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
  ],
  {
    basename: `${basename}`,
  }
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
