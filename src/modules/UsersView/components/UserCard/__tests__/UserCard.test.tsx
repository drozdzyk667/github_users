import { ReactElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GitHubUser } from "../../../helpers/types";
import { UserCard } from "../UserCard.component";

describe("UserCard", () => {
  const baseUser = {
    login: "testuser",
    id: 123,
    avatar_url: "xxx",
    html_url: "yyy",
    type: "User",
    score: 1,
  } as GitHubUser;

  const renderWithTheme = (ui: ReactElement) =>
    render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

  test("renders avatar, login, id, type and link", () => {
    renderWithTheme(<UserCard user={baseUser} />);

    const avatar = screen.getByRole("img", { name: /testuser/i });
    expect(avatar).toHaveAttribute("src", baseUser.avatar_url);

    expect(screen.getByText(baseUser.login)).toBeInTheDocument();

    expect(screen.getByText(`ID: ${baseUser.id}`)).toBeInTheDocument();

    expect(screen.getByText(`Type: ${baseUser.type}`)).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", baseUser.html_url);

    expect(screen.getByTestId("user-profile-icon")).toBeInTheDocument();
  });

  test("displays score when provided", () => {
    const userWithScore = { ...baseUser, score: 4.56789 };

    renderWithTheme(<UserCard user={userWithScore} />);

    expect(screen.getByText("Score: 4.57")).toBeInTheDocument();
  });

  test("shows tooltip with login on hover", async () => {
    renderWithTheme(<UserCard user={baseUser} />);

    const loginElement = screen.getByText(baseUser.login);

    userEvent.hover(loginElement);

    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent(baseUser.login);
  });
});
