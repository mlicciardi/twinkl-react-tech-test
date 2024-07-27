import { all } from "redux-saga/effects";
import postsSaga from "./posts/postsSaga";

export default function* rootSaga() {
  yield all([postsSaga()]);
}
