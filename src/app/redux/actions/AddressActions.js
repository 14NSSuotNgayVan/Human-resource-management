import {
  DELETE_DISTRICT,
  DELETE_PROVINCE,
  DELETE_WARD,
  GET_ALL_DISTRICT,
  GET_ALL_PROVINCES,
  GET_ALL_WARD,
  GET_DISTRICT_BY_PROVINCE_ID,
  GET_WARD_BY_DISTRICT_ID,
  POST_DISTRICT_TO_LIST,
  POST_PROVINCE_TO_LIST,
  POST_WARD_TO_LIST,
  PUT_DISTRICT_TO_LIST,
  PUT_PROVINCE_TO_LIST,
  PUT_WARD_TO_LIST,
  SEARCH_BY_PAGE_DISTRICT,
  SEARCH_BY_PAGE_PROVINCE,
  SEARCH_BY_PAGE_WARD,
} from "../reducers/actionTypeConstant/AddressActionTypeConstant";
//province
export const getAllProvinceAction = () => {
  return {
    type: GET_ALL_PROVINCES,
  };
};
export const addProvinceAction = (data) => {
  return {
    type: POST_PROVINCE_TO_LIST,
    payload: data,
  };
};
export const updateProvinceAction = (id, data) => {
  return {
    type: PUT_PROVINCE_TO_LIST,
    payload: { id, data },
  };
};
export const deleteProvinceAction = (id) => {
  return {
    type: DELETE_PROVINCE,
    payload: id,
  };
};
export const searchByPageProvinceAction = (searchObj) => {
  return {
    type: SEARCH_BY_PAGE_PROVINCE,
    payload: searchObj,
  };
};
//district
export const getAllDistrictAction = () => {
  return {
    type: GET_ALL_DISTRICT,
  };
};
export const addDistrictAction = (data) => {
  return {
    type: POST_DISTRICT_TO_LIST,
    payload: data,
  };
};
export const updateDistrictAction = (id, data) => {
  return {
    type: PUT_DISTRICT_TO_LIST,
    payload: { id, data },
  };
};
export const deleteDistrictAction = (id) => {
  return {
    type: DELETE_DISTRICT,
    payload: id,
  };
};
export const searchByPageDistrictAction = (searchObj) => {
  return {
    type: SEARCH_BY_PAGE_DISTRICT,
    payload: searchObj,
  };
};
//ward
export const getAllWardAction = () => {
  return {
    type: GET_ALL_WARD,
  };
};
export const addWardAction = (data) => {
  return {
    type: POST_WARD_TO_LIST,
    payload: data,
  };
};
export const updateWardAction = (id, data) => {
  return {
    type: PUT_WARD_TO_LIST,
    payload: { id, data },
  };
};
export const deleteWardAction = (id) => {
  return {
    type: DELETE_WARD,
    payload: id,
  };
};
export const searchByPageWardAction = (searchObj) => {
  return {
    type: SEARCH_BY_PAGE_WARD,
    payload: searchObj,
  };
};
//other case
export const getDistrictsByProvinceIdAction = (id) => {
  return {
    type: GET_DISTRICT_BY_PROVINCE_ID,
    payload: id,
  };
};
export const getWardsByDistrictIdAction = (id) => {
  return {
    type: GET_WARD_BY_DISTRICT_ID,
    payload: id,
  };
};
