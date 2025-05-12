import { Button, Stack, Typography } from "@mui/material";
import {
  RefetchOptions,
  QueryObserverResult,
  InfiniteData,
} from "@tanstack/react-query";
import { SearchUsersPage } from "../../helpers/types";

interface SearchErrorProps {
  errorMessage?: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<InfiniteData<SearchUsersPage, unknown>, Error>
  >;
}

export const SearchError = (props: SearchErrorProps) => {
  const { errorMessage, refetch } = props;

  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography color="error" sx={{ mt: 2 }}>
        {errorMessage || "We have unexpected error, please try again!"}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          refetch();
        }}
        sx={{ mt: 1 }}
      >
        Try again
      </Button>
    </Stack>
  );
};
