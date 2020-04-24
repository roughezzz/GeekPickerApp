import {
  GET_BOOK_DETAIL,
  GET_BOOK_DETAIL_SUCCESS,
  GET_BOOK_DETAIL_FAIL,
  GET_BOOK_LIST,
  GET_BOOK_LIST_SUCCESS,
  GET_BOOK_LIST_FAIL,
} from "../constants/ActionTypes";

const initState = {
  loading: true,
  list: null,
  detail: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GET_BOOK_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_BOOK_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    }
    case GET_BOOK_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case GET_BOOK_DETAIL: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_BOOK_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    }
    case GET_BOOK_DETAIL_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
