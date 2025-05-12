import { Box, CircularProgress } from "@mui/material";

export const SearchLoader = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 2 }}>
      <CircularProgress />
    </Box>
  );
};
