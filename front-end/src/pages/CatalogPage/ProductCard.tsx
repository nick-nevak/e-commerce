// generate product card component with material ui

import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Product } from '../../types/product';

type Props = {
  product: Product;
  onClick: (product: Product) => void;
}
const ProductCard = ({ product, onClick }: Props) => {
  return (
    <Card onClick={() => onClick(product)}>
      <CardActionArea sx={{ width: 300, height: 350 }}>
        <CardMedia
          sx={{ height: 200 }}
          image={product.imageUrl}
          title={product.title}
        />
        <CardContent sx={{ height: '100%' }}>
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
