import { ImageList, ImageListItem } from "@mui/material";

interface Props {
  imageUrls: string[];
}
const ProductPictures = (props: Props) => {
  return (
    <ImageList cols={2} rowHeight={300}>
      {props.imageUrls.map((url) => (
        <ImageListItem key={url} cols={1} rows={1}>
          <img
            src={`${url}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default ProductPictures;