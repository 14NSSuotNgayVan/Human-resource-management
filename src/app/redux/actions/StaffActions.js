import {
  GET_ALL_STAFF,
  POST_STAFF_TO_LIST,
  PUT_STAFF_TO_LIST,
  DELETE_STAFF,
  SEARCH_BY_PAGE,
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
export const getAllStaffAction = () => {
  return {
    type: GET_ALL_STAFF,
  };
};
export const addStaffAction = (staff) => {
  return {
    type: POST_STAFF_TO_LIST,
    payload: staff,
  };
};
export const updateStaffAction = (id, data) => {
  return {
    type: PUT_STAFF_TO_LIST,
    payload: { id, data },
  };
};
export const deleteStaffAction = (staffId) => {
  return {
    type: DELETE_STAFF,
    payload: staffId,
  };
};
export const searchByPageAction = (searchObj) => {
  return {
    type: SEARCH_BY_PAGE,
    payload: searchObj,
  };
};

