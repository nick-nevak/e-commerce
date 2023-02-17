// generate product card component with material ui

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Product } from '../../types/product';

type Props = {
  product: Product;
  onClick: (product: Product) => void;
}
const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => onClick(product)}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 140 }}
          image={product.imageUrl}
          title={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h5">
            {product.title}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="subtitle1" color="textPrimary" component="h5">
            {product.price}$
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
