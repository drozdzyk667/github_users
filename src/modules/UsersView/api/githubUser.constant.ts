const GITHUB_API_BASE = "https://api.github.com/search/users";

export const githubUserEndpoint = (
  username: string,
  page: unknown,
  perPage: number = 10
) => `${GITHUB_API_BASE}?q=${username}&page=${page ?? 1}&per_page=${perPage}`;
