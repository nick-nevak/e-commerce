import { blueGrey, teal } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: blueGrey,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: teal[500]
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      // default: "#0A1929",
      // paper: 'rgb(26, 32, 39)'
      //paper: "#0A1929",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          //backgroundColor: '#17181B'
          // '#17181B'
          //'#202124'
          // #212121
          // #0A1929
        }
      }
    }
  }
});


const ThemeContext = createContext<{
  mode: 'light' | 'dark';
  toggle: () => void;
}>({
  mode: 'light',
  toggle: () => { }
});

const themeStorageKey = 'theme';
const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const theme = useMemo(() => mode === 'dark' ? darkTheme : lightTheme, [mode]);
  const themeContext = useMemo(() => ({
    mode: mode,
    toggle: () => {
      const newMode = mode === 'light' ? 'dark' : 'light'
      localStorage.setItem(themeStorageKey, newMode);
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }
  }), [mode]);

  useEffect(() => {
    const theme = localStorage.getItem(themeStorageKey) as 'light' | 'dark' | null;
    setMode(theme ?? 'light')
  }, [])

  return (
    <ThemeContext.Provider value={themeContext}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);
export default AppThemeProvider;
