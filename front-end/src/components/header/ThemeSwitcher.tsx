import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from "@mui/material";
import { useAppTheme } from "../../providers/theme-provider";

const ThemeSwitcher = () => {
  const { mode, toggle } = useAppTheme();
  return (
    <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default ThemeSwitcher;