import { Box, IconButton } from "@mui/material";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";

export const ScrollToTheTop = () => {
  const handleScrollToTeTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        right: "0",
      }}
    >
      <IconButton onClick={handleScrollToTeTop}>
        <ArrowCircleUpOutlinedIcon fontSize="large" color="success" />
      </IconButton>
    </Box>
  );
};
