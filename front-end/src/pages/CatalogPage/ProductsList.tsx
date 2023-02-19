import { Box } from "@mui/material";
import { Product } from "../../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  onClick: (product: Product) => void;
}
const ProductsList = ({ products, onClick }: Props) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', }}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} onClick={onClick} />
    ))}
  </Box>
);
export default ProductsList;
