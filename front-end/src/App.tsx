import { Paper } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import AppThemeProvider from "./providers/theme-provider";
import { router } from "./routing/routes";

function App() {
  return (
    <AppThemeProvider>
      <Paper sx={{ minHeight: '100vh' }}>
        <RouterProvider router={router} />
      </Paper>
    </AppThemeProvider>
  );
}

export default App;
