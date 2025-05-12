import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { fetchGitHubUsers } from "../../api/githubUser.api";
import { MIN_SEARCH_USERNAME_LENGTH } from "../../components/SearchFormComponent/SearchFormComponent.component";
import { SearchUsersPage } from "../types";

export const useGithubUsers = (
  username: string,
  perPage: number = 10
): UseInfiniteQueryResult<InfiniteData<SearchUsersPage>, Error> => {
  return useInfiniteQuery<
    SearchUsersPage,
    Error,
    InfiniteData<SearchUsersPage>,
    ["searchGithubUser", string, number],
    number
  >({
    queryKey: ["searchGithubUser", username, perPage],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      fetchGitHubUsers(username, pageParam, perPage),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: Boolean(username) && username.length >= MIN_SEARCH_USERNAME_LENGTH,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
