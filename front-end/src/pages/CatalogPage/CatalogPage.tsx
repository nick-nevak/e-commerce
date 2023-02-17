import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchFilters, fetchProducts } from "../../api/axios";
import { CATALOG_ROUTE } from "../../routing/routes";
import { Filter } from "../../types/filters";
import { Product } from "../../types/product";
import CatalogFilters from "./CatalogFilters";
import CatalogSorting from "./CatalogSorting";
import ProductsList from "./ProductsList";

const CatalogPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    fetchProducts().then((products) => {
      setProducts(products);
    });
    fetchFilters().then((filters) => {
      setFilters(filters);
    });
  }, []);

  const handleProductClick = ({ id }: Product) => {
    navigate(`${CATALOG_ROUTE}/${id}`);
  };


  return (
    <Container>
      <Box sx={{ flex: 1 }}>
        <CatalogFilters filters={filters} />
      </Box>
      <Box sx={{ flex: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CatalogSorting />
        </Box>
        <ProductsList products={products} onClick={handleProductClick} />
      </Box>
    </Container>
  );
};

export default CatalogPage;
// generate component


const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;