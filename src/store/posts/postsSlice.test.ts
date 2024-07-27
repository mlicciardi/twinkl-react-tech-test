import { describe, expect, it } from "vitest";
import postsReducer, {
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  Post,
  searchPostsRequest,
} from "./postsSlice";
import postsSlice from "./postsSlice";

describe("postsSlice", () => {
  let initialState: ReturnType<typeof postsSlice>;

  beforeEach(() => {
    initialState = {
      loading: false,
      error: null,
      posts: [],
    };
  });

  it("should handle searchPostsRequest", () => {
    const action = searchPostsRequest("test");
    const state = postsReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("should handle searchPostsRequest and update q from search params", () => {
    const action = searchPostsRequest("test");
    const state = postsReducer(initialState, action);

    expect(state.loading).toBe(true);

    const url = new URL(window.location.href);
    url.searchParams.set("q", "test");
    expect(window.location.search).toBe(url.search);
  });

  it("should handle fetchPostsRequest", () => {
    const action = fetchPostsRequest();
    const state = postsReducer(initialState, action);

    expect(state.loading).toBe(true);
  });

  it("should handle fetchPostsRequest and remove q from search params", () => {
    const action = searchPostsRequest("test");
    const state = postsReducer(initialState, action);

    expect(state.loading).toBe(true);

    const url = new URL(window.location.href);
    expect(window.location.search).toBe(url.search);
  });

  it("should handle fetchPostsSuccess", () => {
    const posts: Post[] = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];

    const action = fetchPostsSuccess(posts);
    const state = postsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.posts).toEqual(posts);
  });

  it("should handle fetchPostsFailure", () => {
    const action = fetchPostsFailure("Error message");
    const state = postsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe("Error message");
  });

  it("should handle deletePostRequest", () => {
    const action = deletePostRequest(1);
    const state = postsReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it("should handle deletePostSuccess", () => {
    const initialStateWithPosts = {
      ...initialState,
      posts: [
        { id: 1, title: "Post 1", body: "Body 1" },
        { id: 2, title: "Post 2", body: "Body 2" },
      ],
    };
    const action = deletePostSuccess(1);
    const state = postsReducer(initialStateWithPosts, action);

    expect(state.posts.length).toEqual(1);
  });

  it("should handle deletePostFailure", () => {
    const action = deletePostFailure("Error message");
    const state = postsReducer(initialState, action);

    expect(state.error).toBe("Error message");
  });
});
