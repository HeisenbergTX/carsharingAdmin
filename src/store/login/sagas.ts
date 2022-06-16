import { getError, getTokens } from "./actions";
import { POST_LOGIN } from "./types";
import {  call, takeLatest } from "redux-saga/effects";
import axios from "axios";
import randkey from "randkey";
import { Buffer } from "buffer";
import { ResGenerator } from "../interfaces";
import Cookies from "js-cookie";

const urlAddress = "https://api-factory.simbirsoft1.com/api/auth/login";

const authKey64 = Buffer.from(
  `${randkey.rand(8)}:${process.env.REACT_APP_SECRET_KEY as string}`,
  "utf-8"
).toString("base64");

const postLogin = (payload: any) =>
  axios.post(
    urlAddress,
    {
      ...payload,
    },
    {
      headers: {
        Authorization: `Basic ${authKey64}`,
      },
    }
  );

function* PostLoginSagaWorker({ payload }: any) {
  try {
    const res: ResGenerator = yield call(postLogin, payload);
    Cookies.set("access_token", res.data.access_token);
    Cookies.set("refresh_token", res.data.refresh_token);
  } catch (e: any) {
    {
      getError(e.response.status);
    }
  }
}

function* PostLoginSagaWatcher() {
  yield takeLatest(POST_LOGIN, PostLoginSagaWorker);
}

export default PostLoginSagaWatcher;