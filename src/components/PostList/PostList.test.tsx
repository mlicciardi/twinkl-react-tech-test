import { Post } from "@/store/posts/postsSlice";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { vi } from "vitest";
import PostList from "./PostList";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

describe("PostList", () => {
  it("should render loading state", () => {
    const dispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatch);

    vi.mocked(useSelector).mockReturnValueOnce(true);
    vi.mocked(useSelector).mockReturnValueOnce(null);
    vi.mocked(useSelector).mockReturnValueOnce(null);

    render(<PostList />);

    const element = screen.getByTestId("post-list-loading");
    expect(element).toBeInTheDocument();
  });

  it("should render error state", () => {
    const dispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatch);

    vi.mocked(useSelector).mockReturnValueOnce(false);
    vi.mocked(useSelector).mockReturnValueOnce("error");
    vi.mocked(useSelector).mockReturnValueOnce(null);

    render(<PostList />);

    const element = screen.getByTestId("post-list-error");
    expect(element).toBeInTheDocument();
  });

  it("should render empty state", () => {
    const dispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatch);

    vi.mocked(useSelector).mockReturnValueOnce(false);
    vi.mocked(useSelector).mockReturnValueOnce(null);
    vi.mocked(useSelector).mockReturnValueOnce([]);

    render(<PostList />);

    const element = screen.getByTestId("post-list-empty");
    expect(element).toBeInTheDocument();
  });

  it("should render posts list", () => {
    const posts: Post[] = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
      { id: 3, title: "Post 3", body: "Body 3" },
      { id: 4, title: "Post 4", body: "Body 4" },
      { id: 5, title: "Post 5", body: "Body 5" },
    ];

    const dispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatch);

    vi.mocked(useSelector).mockReturnValueOnce(false);
    vi.mocked(useSelector).mockReturnValueOnce(null);
    vi.mocked(useSelector).mockReturnValueOnce(posts);

    render(<PostList />);

    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    }
  });
});
