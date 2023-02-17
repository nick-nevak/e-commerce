


import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../../api/axios";
import { ProductDetails } from "../../types/product-details";
import ProductAdditionalInfo from "./ProductAdditionalInfo";
import ProductInfo from "./ProductInfo";
import ProductPictures from "./ProductPictures";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchProductDetails(id).then((product) => {
      setProduct(product);
    });
  }, [id]);


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <ProductPictures imageUrls={product.imageUrls} />
      <ProductInfo {...product} />
      <ProductAdditionalInfo {...product} />
    </Container>
  );
};
export default ProductPage;

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  margin: 20px;
`;