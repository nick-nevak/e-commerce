import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useRef } from 'react';
import CategoriesToggle from './categories/CategoriesToggle';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const appBarRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar ref={appBarRef} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <CategoriesToggle anchorEl={appBarRef} />
          <Box
            sx={{ justifySelf: 'flex-end' }}
            children={<ThemeSwitcher />}
          />
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default Header;