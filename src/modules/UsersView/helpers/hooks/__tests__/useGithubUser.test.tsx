import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchGitHubUsers } from "../../../api/githubUser.api";
import { MIN_SEARCH_USERNAME_LENGTH } from "../../../components/SearchFormComponent/SearchFormComponent.component";
import { useGithubUsers } from "../useGithubUser.util";
import { ReactNode } from "react";
import { SearchUsersPage } from "../../types";

jest.mock("../../../api/githubUser.api");
const fetchGitHubUsersMock = jest.mocked(fetchGitHubUsers);

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGithubUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("be an idle and do not fetch when input is too short", () => {
    const shortName = "a".repeat(MIN_SEARCH_USERNAME_LENGTH - 1);
    const { result } = renderHook(() => useGithubUsers(shortName, 5), {
      wrapper: createWrapper(),
    });

    expect(result.current.status).toBe("pending");
    expect(result.current.fetchStatus).toBe("idle");
  });

  it("renders first page when username has min length", async () => {
    const validName = "a".repeat(MIN_SEARCH_USERNAME_LENGTH);
    const page1 = {
      users: [{ id: 1, login: "user1" }],
      nextPage: 2,
    } as unknown as SearchUsersPage;

    fetchGitHubUsersMock.mockResolvedValueOnce(page1);

    const { result } = renderHook(() => useGithubUsers(validName), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(fetchGitHubUsersMock).toHaveBeenCalledWith(validName, 1, 10);
    expect(result.current.data?.pages).toEqual([page1]);
  });

  it("fetch next page after fetchNextPage is triggered", async () => {
    const validName = "abcdef";
    const perPage = 2;
    const page1 = { items: [{ id: 1, login: "u1" }], nextPage: 2 };
    const page2 = { items: [{ id: 2, login: "u2" }], nextPage: undefined };

    (fetchGitHubUsersMock as jest.Mock)
      .mockResolvedValueOnce(page1)
      .mockResolvedValueOnce(page2);

    const { result } = renderHook(() => useGithubUsers(validName, perPage), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => (result.current.data?.pages.length ?? 0) === 2);

    expect(fetchGitHubUsersMock).toHaveBeenNthCalledWith(
      2,
      validName,
      2,
      perPage
    );

    expect(result.current.data?.pages).toEqual([page1, page2]);
    expect(result.current.hasNextPage).toBe(false);
  });
});
