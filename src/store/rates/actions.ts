import { IRate } from "../interfaces";
import {
  FETCH_RATE_REQUEST,
  FETCH_RATE_SUCCESS,
  FETCH_RATE_ERROR,
  CHANGE_RATE,
  PUT_RATE,
  POST_RATE,
  DELETE_RATE,
} from "./types";

export const FetchRateRequest = () => ({
  type: FETCH_RATE_REQUEST,
});

export const FetchRateSuccess = (payload: any) => ({
  type: FETCH_RATE_SUCCESS,
  payload,
});

export const FetchRateError = (payload: any) => ({
  type: FETCH_RATE_ERROR,
  payload,
});

export const changeRate = (payload: IRate | string) => ({
  type: CHANGE_RATE,
  payload,
});

export const PutRate = (rateUpdate: any, id: string, token: string) => ({
  type: PUT_RATE,
  payload: {
    rateUpdate,
    id,
    token,
  },
});

export const PostRate = (rateUpdate: any, token: string) => ({
  type: POST_RATE,
  payload: {
    rateUpdate,
    token,
  },
});

export const DeleteRate = (id: string, token: string) => ({
  type: DELETE_RATE,
  payload: {
    id,
    token,
  },
});