import {
  GET_BOOK_DETAIL,
  GET_BOOK_DETAIL_SUCCESS,
  GET_BOOK_DETAIL_FAIL,
  GET_BOOK_LIST,
  GET_BOOK_LIST_SUCCESS,
  GET_BOOK_LIST_FAIL,
} from "../constants/ActionTypes";

import config from "../../config";

export const bookList = (token) => {
  return {
    type: GET_BOOK_LIST,
    payload: token,
  };
};

export const bookListSuccess = (json) => {
  return {
    type: GET_BOOK_LIST_SUCCESS,
    payload: json,
  };
};

export const bookListFail = (error) => {
  return {
    type: GET_BOOK_LIST_FAIL,
    payload: error,
  };
};

export const bookDetail = (params) => {
  return {
    type: GET_BOOK_DETAIL,
    payload: params,
  };
};

export const bookDetailSuccess = (json) => {
  return {
    type: GET_BOOK_DETAIL_SUCCESS,
    payload: json,
  };
};

export const bookDetailFail = (error) => {
  return {
    type: GET_BOOK_DETAIL_FAIL,
    payload: error,
  };
};

export const fetchBookList = (token) => {
  return async function (dispatch) {
    dispatch(bookList(token));
    try {
      const response = await fetch(`${config.api.url}/books`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      dispatch(bookListSuccess(json.success));
    } catch (error) {
      dispatch(bookListFail(error));
    }
  };
};

export const fetchBookDetail = (params) => {
  return async function (dispatch) {
    dispatch(bookDetail(params));
    try {
      const response = await fetch(
        `${config.api.url}/book_details/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + params.token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      dispatch(bookDetailSuccess(json.success));
    } catch (error) {
      dispatch(bookDetailFail(error));
    }
  };
};
