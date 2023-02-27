import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { ListItemIcon, ListItemText } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Category } from '../../types/category';
import CategoryContent from './CategoryContent';

type Props = {
  anchorEl: RefObject<HTMLElement>,
  categories: Category[];
  onSelect: (id: string) => void;
}
const CategoriesMenu = ({ anchorEl, categories, onSelect }: Props) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => { setSelectedCategory(categories[0]); }, [categories]);

  useLayoutEffect(() => {
    if (!anchorEl.current || !selfRef.current) { return; }

    const anchorRect = anchorEl.current.getBoundingClientRect();
    const y = anchorRect.bottom;
    selfRef.current.style.top = `${y}px`;
  }, [anchorEl, selfRef.current])

  return (
    <Paper
      ref={selfRef}
      sx={{
        position: 'absolute', left: 0, right: 0, zIndex: 10,
        width: '100%', height: '1500px',
      }}>
      <Box sx={{ display: 'flex' }}>
        <List>
          {categories.map((category) => <>
            <ListItemButton
              id={category.id}
              divider
              selected={category === selectedCategory}
              onMouseEnter={() => { setSelectedCategory(category); }}
            >
              <ListItemIcon children={<CurrencyBitcoinIcon />} />
              <ListItemText primary={category.name} />
              <ArrowForwardIosIcon sx={{ height: '20px', ml: 4 }} />
            </ListItemButton>
          </>
          )}
        </List>
        <Box>
          {selectedCategory
            ? <CategoryContent parentCategory={selectedCategory} onSelect={onSelect} />
            : null}
        </Box>
      </Box>
    </Paper>
  );
}

export default CategoriesMenu;