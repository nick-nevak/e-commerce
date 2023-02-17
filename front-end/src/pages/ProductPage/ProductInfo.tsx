import { Box, Button, Rating, Typography } from "@mui/material";
import { ProductDetails } from "../../types/product-details";

const ProductInfo = (
  { brand, title, price, deliveryTime, rating }: ProductDetails
): JSX.Element => {
  return (<Box>
    <Rating name="read-only" value={rating} readOnly />
    <Box sx={{ mt: 1 }}>
      <Typography variant="h6" component="h3">{brand}</Typography>
      <Typography variant="subtitle1" component="h5">{title}</Typography>
      <Typography variant="h6" component="h6">${price}</Typography>
      <Button variant="outlined" color="inherit" sx={{ mt: 2 }}>Add to Cart</Button>
    </Box>
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" component="h5">Delivery Time</Typography>
      <Typography variant="subtitle2" component="h5">{deliveryTime.toString()}</Typography>
    </Box>
  </Box>
  );
};

export default ProductInfo;