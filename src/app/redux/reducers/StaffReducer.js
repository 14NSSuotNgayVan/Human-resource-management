import {
  POST_STAFF_TO_LIST,
  PUT_STAFF_TO_LIST,
  DELETE_STAFF,
  SEARCH_BY_PAGE_SUCCESS,
  SEARCH_BY_PAGE_FAIL,
  SET_LOADING,
  SEARCH_BY_PAGE,
<<<<<<< Updated upstream
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
=======
  SET_IMAGE,
  SET_ITEM,
  POST_STAFF_TO_LIST_SUCCESS,
  PUT_STAFF_TO_LIST_SUCCESS,
} from "app/redux/reducers/actionTypeConstant/StaffActionTypeConstant.js";
>>>>>>> Stashed changes
const initState = {
  itemList: [],
  totalElements: 0,
  loading: false,
};
const StaffReducer = (state = initState, action) => {
  switch (action?.type) {
<<<<<<< Updated upstream

    case SEARCH_BY_PAGE: {
      return {
        ...state,
        loading: true,

      };
=======
    case SET_ITEM:{
      return{
        ...state,
        item:action?.payload
      }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    case DELETE_STAFF: {
      return {
        ...state,
        loading: true,
      };
    }
=======
>>>>>>> Stashed changes
    case POST_STAFF_TO_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
<<<<<<< Updated upstream
=======
    case POST_STAFF_TO_LIST_SUCCESS:{
      return{
        ...state,
        item: action?.payload,
        shouldUpdate:true
      }
    }
>>>>>>> Stashed changes
    case PUT_STAFF_TO_LIST: {
      return {
        ...state,
        loading: true,
      };
    }
<<<<<<< Updated upstream
    case SET_LOADING: {
=======
    case PUT_STAFF_TO_LIST_SUCCESS: {
      return {
        ...state,
        item :action?.payload,
        shouldUpdate:true,
      }
    }
    case SET_IMAGE:{
      return{
        ...state,
        image: action?.payload.url,
        file: action?.payload.file,
      }
    }
    case SET_SHOULD_UPDATE: {
>>>>>>> Stashed changes
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
