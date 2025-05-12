import { GithubSearchResponse, SearchUsersPage } from "../helpers/types";
import { githubUserEndpoint } from "./githubUser.constant";

// TODO: pure function to calculate next page
const calculateNextPage = (
  totalCount: number,
  currentPage: number,
  perPage: number
): number | undefined => {
  const maxPage = Math.ceil(totalCount / perPage);
  return currentPage < maxPage ? currentPage + 1 : undefined;
};

export const fetchGitHubUsers = async (
  username: string,
  page: number = 1,
  perPage: number = 10
): Promise<SearchUsersPage> => {
  const url = githubUserEndpoint(username, page, perPage);

  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as GithubSearchResponse;
  const nextPage = calculateNextPage(data.total_count, page, perPage);

  return {
    items: data.items,
    nextPage,
  };
};
