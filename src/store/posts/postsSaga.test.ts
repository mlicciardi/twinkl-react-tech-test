import axios from "axios";
import { call, put } from "redux-saga/effects";
import { describe, expect, it } from "vitest";
import { fetchPostsSaga, searchPostsSaga } from "./postsSaga";
import {
  fetchPostsFailure,
  fetchPostsSuccess,
  searchPostsRequest,
} from "./postsSlice";

describe("postsSaga", () => {
  describe("searchPostsSaga", () => {
    it("should handle successful search", () => {
      const action = searchPostsRequest("test");
      const generator = searchPostsSaga(action);

      expect(generator.next().value).toEqual(
        call(axios.get, "https://jsonplaceholder.typicode.com/posts?q=test"),
      );

      const response = { data: [{ id: 1, title: "Post 1", body: "Body 1" }] };
      expect(generator.next(response).value).toEqual(
        put(fetchPostsSuccess(response.data)),
      );

      expect(generator.next().done).toBe(true);
    });

    it("should handle search failure", () => {
      const action = searchPostsRequest("test");
      const generator = searchPostsSaga(action);

      expect(generator.next().value).toEqual(
        call(axios.get, "https://jsonplaceholder.typicode.com/posts?q=test"),
      );

      const error = new Error("Network Error");
      expect(generator.throw(error).value).toEqual(
        put(fetchPostsFailure(error.message)),
      );

      expect(generator.next().done).toBe(true);
    });
  });

  describe("fetchPostsSaga", () => {
    it("should handle successful fetch", () => {
      const generator = fetchPostsSaga();

      expect(generator.next().value).toEqual(
        call(axios.get, "https://jsonplaceholder.typicode.com/posts"),
      );

      const response = { data: [{ id: 1, title: "Post 1", body: "Body 1" }] };
      expect(generator.next(response).value).toEqual(
        put(fetchPostsSuccess(response.data)),
      );

      expect(generator.next().done).toBe(true);
    });

    it("should handle fetch failure", () => {
      const generator = fetchPostsSaga();

      expect(generator.next().value).toEqual(
        call(axios.get, "https://jsonplaceholder.typicode.com/posts"),
      );

      const error = new Error("Network Error");
      expect(generator.throw(error).value).toEqual(
        put(fetchPostsFailure(error.message)),
      );

      expect(generator.next().done).toBe(true);
    });
  });
});
