import axios, { AxiosError } from "axios";
import {
  call,
  CallEffect,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";
import {
  deletePostFailure,
  deletePostRequest,
  deletePostSuccess,
  fetchPostsFailure,
  fetchPostsRequest,
  fetchPostsSuccess,
  Post,
  searchPostsRequest,
} from "./postsSlice";

type FetchPostsReturnType = Generator<
  CallEffect | PutEffect,
  void,
  { data: Post[] }
>;
type DeletePostReturnType = Generator<CallEffect | PutEffect, void, {}>;

export function* searchPostsSaga(
  action: ReturnType<typeof searchPostsRequest>,
): FetchPostsReturnType {
  try {
    const response = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/posts?q=${action.payload}`,
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(fetchPostsFailure(error.message));
    } else {
      yield put(fetchPostsFailure((error as Error).message));
    }
  }
}

export function* fetchPostsSaga(): FetchPostsReturnType {
  try {
    const response = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/posts",
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(fetchPostsFailure(error.message));
    } else {
      yield put(fetchPostsFailure((error as Error).message));
    }
  }
}

export function* deletePostsSaga(
  action: ReturnType<typeof deletePostRequest>,
): DeletePostReturnType {
  try {
    yield call(
      axios.delete,
      `https://jsonplaceholder.typicode.com/posts/${action.payload}`,
    );
    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    if (error instanceof AxiosError) {
      yield put(deletePostFailure(error.message));
    } else {
      yield put(fetchPostsFailure((error as Error).message));
    }
  }
}

export default function* postsSaga() {
  yield takeLatest(searchPostsRequest.type, searchPostsSaga);
  yield takeLatest(fetchPostsRequest.type, fetchPostsSaga);
  yield takeLatest(deletePostRequest.type, deletePostsSaga);
}
