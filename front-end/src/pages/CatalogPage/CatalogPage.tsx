import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFilters, fetchProductsByCategory } from "../../api/axios";
import { CATALOG_ROUTE } from "../../routing/routes";
import { Filter } from "../../types/filters";
import { Product } from "../../types/product";
import CatalogFilters from "./CatalogFilters";
import CatalogSorting from "./CatalogSorting";
import useQueryParams from "./hooks/use-query-params";
import ProductsList from "./ProductsList";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  const [params, updateQueryParam] = useQueryParams(['category']);

  const fetchData = useCallback(async () => {
    const products = await fetchProductsByCategory(params.category);
    const filters = await fetchFilters();
    setProducts(products);
    setFilters(filters)
  }, [params]);

  useEffect(() => {
    if (params.category) {
      fetchData();
    }
  }, [params]);

  const handleProductClick = ({ id }: Product) => {
    navigate(`${CATALOG_ROUTE}/${id}`);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <Box sx={{ flex: 1 }}>
        <CatalogFilters filters={filters} />
      </Box>
      <Box sx={{ flex: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CatalogSorting />
        </Box>
        <ProductsList products={products} onClick={handleProductClick} />
      </Box>
    </Box>
  );
};

export default CatalogPage;