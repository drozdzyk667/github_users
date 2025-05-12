import { ReactElement } from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  SearchFormComponent,
  MIN_SEARCH_USERNAME_LENGTH,
} from "../SearchFormComponent.component";

describe("SearchFormComponent", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const renderWithTheme = (ui: ReactElement) =>
    render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

  test(`does not call onHandleSearch for input shorter than MIN_SEARCH_USERNAME_LENGTH`, async () => {
    const handleSearch = jest.fn();
    renderWithTheme(<SearchFormComponent onHandleSearch={handleSearch} />);
    const input = screen.getByLabelText(/GitHub Username/i);
    const shortInput = "a".repeat(MIN_SEARCH_USERNAME_LENGTH - 1);

    userEvent.type(input, shortInput);

    await act(() => Promise.resolve());

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(handleSearch).not.toHaveBeenCalled();
  });

  test("clears previous timer when input changes before delay", async () => {
    const handleSearch = jest.fn();
    renderWithTheme(<SearchFormComponent onHandleSearch={handleSearch} />);
    const input = screen.getByLabelText(/GitHub Username/i);

    const firstValid = "a".repeat(MIN_SEARCH_USERNAME_LENGTH + 1);
    userEvent.type(input, firstValid);
    await act(() => Promise.resolve());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const secondValid = "b".repeat(MIN_SEARCH_USERNAME_LENGTH + 2);
    userEvent.clear(input);
    userEvent.type(input, secondValid);
    await act(() => Promise.resolve());

    await act(async () => {
      jest.advanceTimersByTime(2000);
    });

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith(secondValid);
  });

  test("shows helper text and no error initially", () => {
    const handleSearch = jest.fn();
    renderWithTheme(<SearchFormComponent onHandleSearch={handleSearch} />);
    expect(
      screen.getByText(
        /After you finish typing, please wait 2s, users will be fetched automatically/i
      )
    ).toBeInTheDocument();

    const input = screen.getByLabelText(/GitHub Username/i);
    expect(input).not.toHaveAttribute("aria-invalid", "true");
  });

  test("shows error state when input invalid", async () => {
    const handleSearch = jest.fn();
    renderWithTheme(<SearchFormComponent onHandleSearch={handleSearch} />);
    const input = screen.getByLabelText(/GitHub Username/i);

    userEvent.type(input, "a");
    userEvent.tab();

    expect(await screen.findByText(/at least/i)).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
