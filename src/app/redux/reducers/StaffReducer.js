import {
  POST_STAFF_TO_LIST,
  PUT_STAFF_TO_LIST,
  DELETE_STAFF,
  SEARCH_BY_PAGE_SUCCESS,
  SEARCH_BY_PAGE_FAIL,
  SET_SHOULD_UPDATE,
  SEARCH_BY_PAGE,
  SET_IMAGE,
  SET_ITEM,
  POST_STAFF_TO_LIST_SUCCESS,
  PUT_STAFF_TO_LIST_SUCCESS,
  GET_STAFF_BY_ID_SUCCESS,
  GET_STAFF_BY_ID_FAIL,
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
const initState = {
  item:{},
  itemList: [],
  totalElements: 0,
  shouldUpdate: false,
  image:"",
  file:{},
};
const StaffReducer = (state = initState, action) => {
  switch (action?.type) {
    case SET_ITEM:{
      return{
        ...state,
        item:action?.payload
      }
    }
    case GET_STAFF_BY_ID_SUCCESS:{
      return {
        ...state,
        item:action?.payload
      }
    }
    case GET_STAFF_BY_ID_FAIL:{
      return {
        ...state,
        item:{}
      }
    }
    case SEARCH_BY_PAGE_SUCCESS: {
      return {
        ...state,
        itemList: action?.payload.data,
        totalElements: action?.payload?.totalElements,
        shouldUpdate: false,
      };
    }
    case SEARCH_BY_PAGE_FAIL: {
      return {
        ...state,
        itemList: [],
        totalElements: 0,
        shouldUpdate: false,
      };
    }
    case POST_STAFF_TO_LIST: {
      return {
        ...state,
        shouldUpdate: false,
      };
    }
    case POST_STAFF_TO_LIST_SUCCESS:{
      return{
        ...state,
        item: action?.payload,
        shouldUpdate:true
      }
    }
    case PUT_STAFF_TO_LIST: {
      return {
        ...state,
        shouldUpdate: false,
      };
    }
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
      return {
        ...state,
        shouldUpdate: true,
      };
    }
    default: {
      return state;
    }
  }
};
export default StaffReducer;
