import ConstantList from "../../appConfig";
import {
  DELETE_DISTRICT,
  DELETE_PROVINCE,
  DELETE_WARD,
  GET_ALL_DISTRICT,
  GET_ALL_DISTRICT_FAIL,
  GET_ALL_DISTRICT_SUCCESS,
  GET_ALL_PROVINCES,
  GET_ALL_PROVINCES_FAIL,
  GET_ALL_PROVINCES_SUCCESS,
  GET_ALL_WARD,
  GET_ALL_WARD_FAIL,
  GET_ALL_WARD_SUCCESS,
  GET_DISTRICT_BY_PROVINCE_ID,
  GET_DISTRICT_BY_PROVINCE_ID_FAIL,
  GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
  GET_WARD_BY_DISTRICT_ID,
  GET_WARD_BY_DISTRICT_ID_FAIL,
  GET_WARD_BY_DISTRICT_ID_SUCCESS,
  POST_DISTRICT_TO_LIST,
  POST_PROVINCE_TO_LIST,
  POST_WARD_TO_LIST,
  PUT_DISTRICT_TO_LIST,
  PUT_PROVINCE_TO_LIST,
  PUT_WARD_TO_LIST,
  SEARCH_BY_PAGE_DISTRICT,
  SEARCH_BY_PAGE_DISTRICT_FAIL,
  SEARCH_BY_PAGE_DISTRICT_SUCCESS,
  SEARCH_BY_PAGE_PROVINCE,
  SEARCH_BY_PAGE_PROVINCE_FAIL,
  SEARCH_BY_PAGE_PROVINCE_SUCCESS,
  SEARCH_BY_PAGE_WARD,
  SEARCH_BY_PAGE_WARD_FAIL,
  SEARCH_BY_PAGE_WARD_SUCCESS,
  SET_SHOULD_UPDATE_DISTRICT,
  SET_SHOULD_UPDATE_PROVINCE,
  SET_SHOULD_UPDATE_WARD,
} from "../actionTypeConstant/AddressActionTypeConstant";
const { checkResponseCode } = require("app/constants/apiCodeStatus");
const { default: axios } = require("axios");
const { toast } = require("react-toastify");
const { call, put, takeLatest } = require("redux-saga/effects");

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function* getAllProvince(action) {
  try {
    const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + `/api/provinces/all`);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        yield put({ type: GET_ALL_PROVINCES_SUCCESS, payload: data.data });
      }
    } else {
      toast.error(data?.message);
      yield put({ type: GET_ALL_PROVINCES_FAIL });
    }
  } catch (err) {
    toast.error(err);
  }
}
function* addProvince(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + `/api/provinces`, action.payload);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        toast.success("Thêm thành công");
        yield put({ type: SET_SHOULD_UPDATE_PROVINCE });
      }
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* updateProvince(action) {
  try {
    const { data } = yield call(
      axios.put,
      ConstantList.API_ENDPOINT + `/api/provinces/${action.payload.id}`,
      action.payload.data
    );
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        toast.success("Sửa thành công");
        yield put({ type: SET_SHOULD_UPDATE_PROVINCE });
      }
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* deleteProvince(action) {
  try {
    const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `/api/provinces/${action.payload}`);
    if (checkResponseCode(data?.code)) {
      yield put({ type: SET_SHOULD_UPDATE_PROVINCE });
      yield put({ type: SET_SHOULD_UPDATE_DISTRICT });
      yield put({ type: SET_SHOULD_UPDATE_WARD });
      toast.success("Xóa thành công");
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* searchByPageProvince(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + `/api/provinces/page`, action.payload);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        yield put({ type: SEARCH_BY_PAGE_PROVINCE_SUCCESS, payload: data.data });
      }
    } else {
      toast.error(data?.message);
      yield put({ type: SEARCH_BY_PAGE_PROVINCE_FAIL });
    }
  } catch (err) {
    toast.error(err);
  }
}

function* getDistrictsByProvinceId(action) {
  try {
    const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + `/api/provinces/${action.payload}/districts`);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        yield put({ type: GET_DISTRICT_BY_PROVINCE_ID_SUCCESS, payload: data?.data });
      } else yield put({ type: GET_DISTRICT_BY_PROVINCE_ID_FAIL });
    } else toast.error(data?.message);
  } catch (err) {
    toast.error(err);
  }
}
function* getWardsByDistrictId(action) {
  try {
    const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + `/api/districts/${action.payload}/wards`);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        yield put({ type: GET_WARD_BY_DISTRICT_ID_SUCCESS, payload: data?.data });
      } else yield put({ type: GET_WARD_BY_DISTRICT_ID_FAIL });
    } else toast.error(data?.message);
  } catch (err) {
    toast.error(err);
  }
}

function* getAllDistrict(action) {
  try {
    const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + `/api/districts/all`);
    if (checkResponseCode(data.code)) {
      if (data.data) {
        yield put({ type: GET_ALL_DISTRICT_SUCCESS, payload: data?.data });
      } else toast.error("GET_ALL_DISTRICT data empty");
    } else {
      toast.error(data.message);
      yield put({ type: GET_ALL_DISTRICT_FAIL });
    }
  } catch (err) {
    toast.error(err);
  }
}
function* addDistrict(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + `/api/districts`, action.payload);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        toast.success("thêm thành công");
        yield put({ type: SET_SHOULD_UPDATE_DISTRICT });
      }
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* updateDistrict(action) {
  try {
    const { data } = yield call(
      axios.put,
      ConstantList.API_ENDPOINT + `/api/districts/${action.payload.id}`,
      action.payload.data
    );
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        toast.success("Sửa thành công");
        yield put({ type: SET_SHOULD_UPDATE_DISTRICT });
      }
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* deleteDistrict(action) {
  try {
    const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `/api/districts/${action.payload}`);
    if (checkResponseCode(data?.code)) {
      yield put({ type: SET_SHOULD_UPDATE_DISTRICT });
      yield put({ type: SET_SHOULD_UPDATE_WARD });
      toast.success("Xóa thành công");
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* searchByPageDistrict(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + `/api/districts/page`, action.payload);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        yield put({ type: SEARCH_BY_PAGE_DISTRICT_SUCCESS, payload: data.data });
      }
    } else {
      toast.error(data?.message);
      yield put({ type: SEARCH_BY_PAGE_DISTRICT_FAIL });
    }
  } catch (err) {
    toast.error(err);
  }
}

function* getAllWard(action) {
  try {
    const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + `/api/wards/all`);
    if (checkResponseCode(data.code)) {
      if (data.data) {
        yield put({ type: GET_ALL_WARD_SUCCESS, payload: data?.data });
      } else toast.error("GET_ALL_WARD data empty");
    } else {
      toast.error(data.message);
      yield put({ type: GET_ALL_WARD_FAIL });
    }
  } catch (err) {
    toast.error(err);
  }
}
function* addWard(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + `/api/wards`, action.payload);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        toast.success("Thêm thành công");
        yield put({ type: SET_SHOULD_UPDATE_WARD });
      }
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* updateWard(action) {
  try {
    const { data } = yield call(
      axios.put,
      ConstantList.API_ENDPOINT + `/api/wards/${action.payload.id}`,
      action.payload.data
    );
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        toast.success("Sửa thành công");
        yield put({ type: SET_SHOULD_UPDATE_WARD });
      }
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* deleteWard(action) {
  try {
    const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `/api/wards/${action.payload}`);
    if (checkResponseCode(data?.code)) {
      yield put({ type: SET_SHOULD_UPDATE_WARD });
      toast.success("Xóa thành công");
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* searchByPageWard(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + `/api/wards/page`, action.payload);
    if (checkResponseCode(data?.code)) {
      if (data?.data) {
        yield put({ type: SEARCH_BY_PAGE_WARD_SUCCESS, payload: data.data });
      }
    } else {
      toast.error(data?.message);
      yield put({ type: SEARCH_BY_PAGE_WARD_FAIL });
    }
  } catch (err) {
    toast.error(err);
  }
}
export function* AddressSaga() {
  yield takeLatest(GET_ALL_PROVINCES, getAllProvince);
  yield takeLatest(POST_PROVINCE_TO_LIST, addProvince);
  yield takeLatest(PUT_PROVINCE_TO_LIST, updateProvince);
  yield takeLatest(DELETE_PROVINCE, deleteProvince);
  yield takeLatest(SEARCH_BY_PAGE_PROVINCE, searchByPageProvince);

  yield takeLatest(GET_DISTRICT_BY_PROVINCE_ID, getDistrictsByProvinceId);
  yield takeLatest(GET_WARD_BY_DISTRICT_ID, getWardsByDistrictId);

  yield takeLatest(GET_ALL_DISTRICT, getAllDistrict);
  yield takeLatest(POST_DISTRICT_TO_LIST, addDistrict);
  yield takeLatest(PUT_DISTRICT_TO_LIST, updateDistrict);
  yield takeLatest(DELETE_DISTRICT, deleteDistrict);
  yield takeLatest(SEARCH_BY_PAGE_DISTRICT, searchByPageDistrict);

  yield takeLatest(GET_ALL_WARD, getAllWard);
  yield takeLatest(POST_WARD_TO_LIST, addWard);
  yield takeLatest(PUT_WARD_TO_LIST, updateWard);
  yield takeLatest(DELETE_WARD, deleteWard);
  yield takeLatest(SEARCH_BY_PAGE_WARD, searchByPageWard);
}
