import { deletePostRequest, Post } from "@/store/posts/postsSlice";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { vi } from "vitest";
import PostItem from "./PostItem";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

describe("PostItem", () => {
  const post: Post = {
    id: 1,
    title: "Test title",
    body: "Test body",
  };

  it("should render post title and body", () => {
    render(<PostItem {...post} />);

    expect(screen.getByText(post.title)).toBeInTheDocument();
    expect(screen.getByText(post.body)).toBeInTheDocument();
  });

  it("should render post delete button", () => {
    render(<PostItem {...post} />);

    const element = screen.getByTestId("post-item-delete");
    expect(element).toBeTruthy();
  });

  it("should dispatch deletePostRequest on delete button click", () => {
    const dispatch = vi.fn();
    vi.mocked(useDispatch).mockReturnValue(dispatch);

    render(<PostItem {...post} />);

    const element = screen.getByTestId("post-item-delete");
    if (element) {
      fireEvent.click(element);
      expect(dispatch).toHaveBeenCalledWith(deletePostRequest(post.id));
    }
  });
});
