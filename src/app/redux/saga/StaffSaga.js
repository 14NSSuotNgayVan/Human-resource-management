import axios from "axios";
import ConstantList from "../../appConfig";
import { checkResponseCode } from "app/constants/apiCodeStatus.js";
import { toast } from "react-toastify";
import {
  POST_STAFF_TO_LIST,
  PUT_STAFF_TO_LIST,
  DELETE_STAFF,
  SEARCH_BY_PAGE,
  SEARCH_BY_PAGE_SUCCESS,
  SEARCH_BY_PAGE_FAIL,
  SET_LOADING,
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
import { takeLatest, put, call } from "redux-saga/effects";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* searchByPage(action) {
  try {
    const {data} = yield call(axios.get, ConstantList.API_ENDPOINT + "employee/search", {params: {...action.payload}});
    console.log(data);
    if (checkResponseCode(data.code)) {
      if (data.data) {
        yield put({
          type: SEARCH_BY_PAGE_SUCCESS,
          payload: data,
        });
      } else yield put({ type: SEARCH_BY_PAGE_FAIL });
    } else toast.error(data.message);
  } catch (err) {
    toast.error(err);
  }
}
function* deleteStaff(action) {
  try {
    const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `/api/employees/${action.payload}`);
    if (checkResponseCode(data?.code)) {
      yield put({ type: SET_LOADING });
      toast.success("Xóa thành công");
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* addStaff(action) {
  try {
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "/api/employees", action.payload);
    if (checkResponseCode(data?.code)) {
      toast.success("Thêm thành công");
      yield put({ type: SET_LOADING });
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}
function* updateStaff(action) {
  try {
    const { data } = yield call(
      axios.put,
      ConstantList.API_ENDPOINT + `/api/employees/${action.payload.id}`,
      action.payload.data
    );
    if (checkResponseCode(data?.code)) {
      toast.success("Chỉnh sửa nhân viên thành công!");
      yield put({ type: SET_LOADING });
    } else {
      toast.error(data?.message);
    }
  } catch (err) {
    toast.error(err);
  }
}

export function* StaffSaga() {
  yield takeLatest(SEARCH_BY_PAGE, searchByPage);
  yield takeLatest(DELETE_STAFF, deleteStaff);
  yield takeLatest(POST_STAFF_TO_LIST, addStaff);
  yield takeLatest(PUT_STAFF_TO_LIST, updateStaff);
}
