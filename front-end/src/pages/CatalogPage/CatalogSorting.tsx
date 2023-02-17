import { Box, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const CatalogSorting = () => {
  const [value, setValue] = useState<string>('');
  return (<Box>
    <Select>
      <MenuItem value={'price-ascending'}>Price (ascending)</MenuItem>
      <MenuItem value={'price-descending'}>Price (descending)</MenuItem>
      <MenuItem value={'featured'}>Featured</MenuItem>
      <MenuItem value={'newest'}>Newest</MenuItem>
    </Select>
  </Box>);
};

export default CatalogSorting;
