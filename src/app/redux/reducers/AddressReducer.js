import {
  GET_ALL_PROVINCES_SUCCESS,
  GET_ALL_PROVINCES_FAIL,
  GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
  GET_DISTRICT_BY_PROVINCE_ID_FAIL,
  GET_WARD_BY_DISTRICT_ID_SUCCESS,
  GET_WARD_BY_DISTRICT_ID_FAIL,
  GET_ALL_DISTRICT_SUCCESS,
  GET_ALL_DISTRICT_FAIL,
  GET_ALL_WARD_SUCCESS,
  GET_ALL_WARD_FAIL,
  SEARCH_BY_PAGE_PROVINCE_SUCCESS,
  SEARCH_BY_PAGE_PROVINCE_FAIL,
  DELETE_PROVINCE,
  POST_PROVINCE_TO_LIST,
  PUT_PROVINCE_TO_LIST,
  SET_SHOULD_UPDATE_PROVINCE,
  SEARCH_BY_PAGE_DISTRICT_SUCCESS,
  SEARCH_BY_PAGE_DISTRICT_FAIL,
  DELETE_DISTRICT,
  POST_DISTRICT_TO_LIST,
  PUT_DISTRICT_TO_LIST,
  SET_SHOULD_UPDATE_DISTRICT,
  SEARCH_BY_PAGE_WARD_SUCCESS,
  SEARCH_BY_PAGE_WARD_FAIL,
  DELETE_WARD,
  POST_WARD_TO_LIST,
  PUT_WARD_TO_LIST,
  SET_SHOULD_UPDATE_WARD,
} from "./actionTypeConstant/AddressActionTypeConstant";

const initState = {
  listProvinces: [],
  totalProvinceElement: 0,
  shouldProvinceUpDate: false,
  listDistricts: [],
  totalDistrictElement: 0,
  shouldDistrictUpDate: false,
  listWards: [],
  totalWardElement: 0,
  shouldWardUpDate: false,
};
const AddressReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_PROVINCES_SUCCESS: {
      return {
        ...state,
        listProvinces: action?.payload,
      };
    }
    case GET_ALL_PROVINCES_FAIL: {
      return {
        ...state,
        listProvinces: [],
      };
    }
    case SEARCH_BY_PAGE_PROVINCE_SUCCESS: {
      return {
        ...state,
        listProvinces: action?.payload?.content,
        totalProvinceElement: action?.payload?.totalElements,
        shouldProvinceUpDate: false,

      };
    }
    case SEARCH_BY_PAGE_PROVINCE_FAIL: {
      return {
        ...state,
        listProvinces: [],
        totalProvinceElement: 0,
      };
    }
    case DELETE_PROVINCE: {
      return {
        ...state,
        shouldProvinceUpDate: false,
      };
    }
    case POST_PROVINCE_TO_LIST: {
      return {
        ...state,
        shouldProvinceUpDate: false,
      };
    }
    case PUT_PROVINCE_TO_LIST: {
      return {
        ...state,
        shouldProvinceUpDate: false,
      };
    }
    case SET_SHOULD_UPDATE_PROVINCE: {
      return {
        ...state,
        shouldProvinceUpDate: true,
      };
    }
    //district
    case GET_ALL_DISTRICT_SUCCESS: {
      return {
        ...state,
        listDistricts: action?.payload,
      };
    }
    case GET_ALL_DISTRICT_FAIL: {
      return {
        ...state,
        listDistricts: [],
      };
    }
    case SEARCH_BY_PAGE_DISTRICT_SUCCESS: {
      return {
        ...state,
        listDistricts: action?.payload?.content,
        totalDistrictElement: action?.payload?.totalElements,
        shouldDistrictUpDate: false,
      };
    }
    case SEARCH_BY_PAGE_DISTRICT_FAIL: {
      return {
        ...state,
        listDistricts: [],
        totalDistrictElement: 0,
      };
    }
    case DELETE_DISTRICT: {
      return {
        ...state,
        shouldDistrictUpDate: false,
      };
    }
    case POST_DISTRICT_TO_LIST: {
      return {
        ...state,
        shouldDistrictUpDate: false,
      };
    }
    case PUT_DISTRICT_TO_LIST: {
      return {
        ...state,
        shouldDistrictUpDate: false,
      };
    }
    case SET_SHOULD_UPDATE_DISTRICT: {
      return {
        ...state,
        shouldDistrictUpDate: true,
      };
    }

    //ward
    case GET_ALL_WARD_SUCCESS: {
      return {
        ...state,
        listWards: action?.payload,
      };
    }
    case GET_ALL_WARD_FAIL: {
      return {
        ...state,
        listWards: [],
      };
    }
    case SEARCH_BY_PAGE_WARD_SUCCESS: {
      return {
        ...state,
        listWards: action?.payload?.content,
        totalWardElement: action?.payload?.totalElements,
        shouldWardUpDate: false,
      };
    }
    case SEARCH_BY_PAGE_WARD_FAIL: {
      return {
        ...state,
        listWards: [],
        totalWardElement: 0,
      };
    }
    case DELETE_WARD: {
      return {
        ...state,
        shouldWardUpDate: false,
      };
    }
    case POST_WARD_TO_LIST: {
      return {
        ...state,
        shouldWardUpDate: false,
      };
    }
    case PUT_WARD_TO_LIST: {
      return {
        ...state,
        shouldWardUpDate: false,
      };
    }
    case SET_SHOULD_UPDATE_WARD: {
      return {
        ...state,
        shouldWardUpDate: true,
      };
    }

    //othercase
    case GET_DISTRICT_BY_PROVINCE_ID_SUCCESS: {
      return {
        ...state,
        listDistricts: action?.payload,
      };
    }
    case GET_DISTRICT_BY_PROVINCE_ID_FAIL: {
      return {
        ...state,
        listDistricts: [],
      };
    }
    case GET_WARD_BY_DISTRICT_ID_SUCCESS: {
      return {
        ...state,
        listWards: action?.payload,
      };
    }
    case GET_WARD_BY_DISTRICT_ID_FAIL: {
      return {
        ...state,
        listWards: [],
      };
    }
    default: {
      return state;
    }
  }
};
export default AddressReducer;
