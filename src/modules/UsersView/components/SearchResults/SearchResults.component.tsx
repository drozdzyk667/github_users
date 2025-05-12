import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { SearchError } from "../SearchError/SearchError.component";
import { UserCard } from "../UserCard/UserCard.component";
import { useGithubUsers } from "../../helpers/hooks/useGithubUser.util";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import useInfiniteScroll from "react-infinite-scroll-hook";
import { GitHubUser } from "../../helpers/types";
import { SearchLoader } from "../SearchLoader/SearchLoader.component";
import { ScrollToTheTop } from "../../../../common/components/ScrollToTheTop/ScrollToTheTop.component";

const PER_PAGE = 10;

interface SearchResultsProps {
  searchTerm: string;
}

export const SearchResults = (props: SearchResultsProps) => {
  const { searchTerm } = props;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isFetchNextPageError,
    fetchPreviousPage,
  } = useGithubUsers(searchTerm, PER_PAGE);

  const [scrollRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    delayInMs: 1000,
    hasNextPage: Boolean(hasNextPage) && !isFetchNextPageError,
    onLoadMore: fetchNextPage,
  });

  const users = data?.pages.flatMap((p) => p.items) ?? [];
  const isUsersStackAvailable = users.length > 0;

  if (isLoading) {
    return <SearchLoader />;
  }

  if (isError && searchTerm && !users.length) {
    return <SearchError refetch={refetch} errorMessage={error.message} />;
  }

  return (
    <>
      <Stack alignItems="center">
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          sx={{
            gap: 2,
            m: 3,
          }}
        >
          {searchTerm &&
            (isUsersStackAvailable ? (
              users.map((user: GitHubUser) => (
                <UserCard key={user.id} user={user} />
              ))
            ) : (
              <Typography variant="h3" color="warning">
                No users found
              </Typography>
            ))}
        </Stack>

        {isUsersStackAvailable &&
          (isFetchNextPageError ? (
            <SearchError refetch={fetchPreviousPage} />
          ) : (
            hasNextPage && (
              <Stack direction="column" alignItems="center" mt="3rem">
                <KeyboardDoubleArrowDownIcon fontSize="large" />
                <Typography variant="caption">Scroll to fetch more</Typography>
              </Stack>
            )
          ))}

        {hasNextPage && (
          <Box ref={scrollRef} sx={{ textAlign: "center", mt: 2 }}>
            {isFetchingNextPage && <CircularProgress />}
          </Box>
        )}
      </Stack>

      {isUsersStackAvailable && <ScrollToTheTop />}
    </>
  );
};
