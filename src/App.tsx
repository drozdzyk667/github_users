import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersView } from "./modules/UsersView/UsersView.component";
import { createTheme, ThemeProvider } from "@mui/material";

export const App = () => {
  const queryClient = new QueryClient();
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UsersView />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
