import {
  GET_ALL_STAFF,
  POST_STAFF_TO_LIST,
  PUT_STAFF_TO_LIST,
  DELETE_STAFF,
  SEARCH_BY_PAGE,
  UPLOAD_IMAGE,
  SET_IMAGE,
  SET_ITEM,
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
export const getAllStaffAction = () => {
  return {
    type: GET_ALL_STAFF,
  };
};
export const addStaffAction = (staff, file) => {

  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    return {
      type: POST_STAFF_TO_LIST,
      payload: { staff: staff, file: formData }
    };
  } else return {
    type: POST_STAFF_TO_LIST,
    payload: { staff: staff },
  }
};
export const updateStaffAction = (staff, file) => {
  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    return {
      type: PUT_STAFF_TO_LIST,
      payload: { staff: staff, file: formData }
    };
  } else
    return {
      type: PUT_STAFF_TO_LIST,
      payload: { staff: staff },
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
export const uploadImageAction = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return {
    type: UPLOAD_IMAGE,
    payload: formData,
  }
}
export const setStaffImage = (url, file) => {
  return {
    type: SET_IMAGE,
    payload: { url: url, file: file },
  }
}
export const setItem = (staff) => {
  return {
    type: SET_ITEM,
    payload: staff,
  }
}

