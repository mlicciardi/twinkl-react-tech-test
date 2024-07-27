import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  loading: boolean;
  error: string | null;
  posts: Post[];
}

const initialState: PostsState = {
  loading: false,
  error: null,
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    searchPostsRequest(state, action: PayloadAction<string>) {
      state.loading = true;

      const url = new URL(window.location.href);
      if (action.payload.length < 3) {
        url.searchParams.delete("q");
      } else {
        url.searchParams.set("q", action.payload);
      }
      window.history.pushState({}, "", url.toString());
    },
    fetchPostsRequest(state) {
      state.loading = true;

      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      window.history.pushState({}, "", url.toString());
    },
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostRequest(_state, _action: PayloadAction<number>) {},
    deletePostSuccess(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    deletePostFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  searchPostsRequest,
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
} = postsSlice.actions;

export default postsSlice.reducer;
