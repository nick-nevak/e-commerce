import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import ProductPage from "../pages/ProductPage/ProductPage";

export const CATALOG_ROUTE = "/catalog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CatalogPage />,
  },
  {
    path: CATALOG_ROUTE,
    element: <CatalogPage />,
  },
  {
    path: `${CATALOG_ROUTE}/:id`,
    element: <ProductPage />,
  },
]);