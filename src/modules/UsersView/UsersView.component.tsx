import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { SearchResults } from "./components/SearchResults/SearchResults.component";
import { SearchFormComponent } from "./components/SearchFormComponent/SearchFormComponent.component";

export const UsersView = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = useCallback((username: string) => {
    setSearchTerm(username);
  }, []);

  return (
    <Box sx={{ p: 2, mb: "6rem" }}>
      <SearchFormComponent onHandleSearch={handleSearch} />
      <SearchResults searchTerm={searchTerm} />
    </Box>
  );
};
