import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import ProductPage from "../pages/ProductPage/ProductPage";

export const CATALOG_ROUTE = "/catalog";

export const router = createBrowserRouter([
  {
    element: <>
      <Header />
      <Outlet />
    </>,
    path: '/',
    children: [
      {
        path: '/',
        element: <CatalogPage />,
      },
      {
        path: CATALOG_ROUTE,
        element: <CatalogPage />,
      },
      {
        path: `${CATALOG_ROUTE}/:id`,
        element: <ProductPage />,
      }
    ]
  },
]
);