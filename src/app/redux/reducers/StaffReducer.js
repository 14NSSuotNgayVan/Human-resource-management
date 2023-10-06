import {
  POST_STAFF_TO_LIST,
  PUT_STAFF_TO_LIST,
  DELETE_STAFF,
  SEARCH_BY_PAGE_SUCCESS,
  SEARCH_BY_PAGE_FAIL,
  SET_LOADING,
  SEARCH_BY_PAGE,
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
const initState = {
  itemList: [],
  totalElements: 0,
  loading: false,
};
const StaffReducer = (state = initState, action) => {
  switch (action?.type) {

    case SEARCH_BY_PAGE: {
      return {
        ...state,
        loading: true,

      };
    }
    case SEARCH_BY_PAGE_SUCCESS: {
      return {
        ...state,
        itemList: action?.payload.data,
        totalElements: action?.payload?.totalElements,
        loading: false,

      };
    }
    case SEARCH_BY_PAGE_FAIL: {
      return {
        ...state,
        itemList: [],
        totalElements: 0,
        loading: false,
      };
    }
    case DELETE_STAFF: {
      return {
        ...state,
        loading: true,
      };
    }
    case POST_STAFF_TO_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PUT_STAFF_TO_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default StaffReducer;
