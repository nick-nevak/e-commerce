import { styled } from "@mui/material";
import { Product } from "../../types/product";
import ProductCard from "./ProductCard";


const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: theme.spacing(2),
}));

type Props = {
  products: Product[];
  onClick: (product: Product) => void;
}
const ProductsList = ({ products, onClick }: Props) => (
  <Container>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} onClick={onClick} />
    ))}
  </Container>
);
export default ProductsList;
