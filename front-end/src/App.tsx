import { Paper } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Header from "./components/header/Header";
import AppThemeProvider from "./providers/theme-provider";
import { router } from "./routing/routes";

function App() {
  return (
    <AppThemeProvider>
      <Header />
      <Paper sx={{ minHeight: '100vh' }}>
        <RouterProvider router={router} />
      </Paper>
    </AppThemeProvider>
  );
}

export default App;
