import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useDispatch } from "react-redux";
import SearchInput from "./SearchInput";
import { searchPostsRequest } from "@/store/posts/postsSlice";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("@/hooks/useDebounce", () => ({
  __esModule: true,
  default: (value: string) => value,
}));

describe("SearchInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.history.pushState({}, "", "/?q=initial");
  });

  it("should render the search input", () => {
    render(<SearchInput />);

    const element = screen.getByTestId("SearchInput").querySelector("input");
    expect(element).toBeInTheDocument();
  });

  it("should initialize searchTerm state from URL", () => {
    render(<SearchInput />);

    const element = screen.getByTestId("SearchInput").querySelector("input");
    expect(element).toHaveValue("initial");
  });

  it("should update searchTerm state on input change", () => {
    render(<SearchInput />);

    const element = screen.getByTestId("SearchInput").querySelector("input");
    if (element) {
      fireEvent.change(element, { target: { value: "test" } });
      expect(element).toHaveValue("test");
    }
  });

  it("should dispatch searchPostsRequest when debouncedSearchTerm length is greater or equal of 3", () => {
    const dispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatch);

    render(<SearchInput />);

    const element = screen.getByTestId("SearchInput").querySelector("input");
    if (element) {
      fireEvent.change(element, { target: { value: "test" } });
      expect(dispatch).toHaveBeenCalledWith(searchPostsRequest("test"));
    }
  });
});
