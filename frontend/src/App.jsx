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
import MemberPage from "./pages/Member.jsx";
import OrderDetailPage from "./pages/OrderDetail.jsx";
import MemberRootLayout from "./pages/MemberRootLayout.jsx";

const HomePage = lazy(() => import("./pages/Home.jsx"));
const MenPage = lazy(() => import("./pages/Men.jsx"));
const FemalePage = lazy(() => import("./pages/Female.jsx"));

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
          path: "orders",
          element: (
            <ProtectedRoute>
              <MemberRootLayout />
            </ProtectedRoute>
          ),
          children: [
            { index: true, element: <MemberPage /> },
            { path: ":orderId", element: <OrderDetailPage /> },
          ],
        },

        {
          path: "/",
          element: <BannerBarLayout />,
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
    basename: "/sh-select-project",
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
