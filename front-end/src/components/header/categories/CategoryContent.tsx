import { List, ListItem, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Category } from '../../../types/category';


type Props = {
  parentCategory: Category;
}
const CategoryContent = ({ parentCategory }: Props) => {
  return (
    <Box
      sx={{ padding: '20px 40px' }} >
      <Typography
        variant='h4' sx={{ mb: 2, cursor: 'pointer' }}
        children={parentCategory.name}
      />
      <Box
        sx={{ display: 'flex', columnGap: '200px', rowGap: '20px', flexWrap: 'wrap' }}
        children={
          parentCategory.children.map((category) =>
            <List
              id={category.id}
              dense
              sx={{ width: '10%' }}
              subheader={
                <Typography
                  variant='h6' sx={{ cursor: 'pointer' }}
                  children={category.name}
                />}
              children={
                category.children.map(({ id, name }) =>
                  <ListItem
                    id={id}
                    sx={{ padding: 0, cursor: 'pointer' }}
                    children={<ListItemText primary={name} />}
                  />)}
            />)}
      />
    </Box>
  );
}

export default CategoryContent;