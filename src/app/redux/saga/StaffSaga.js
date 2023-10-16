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
  SET_SHOULD_UPDATE,
  UPLOAD_IMAGE,
  GET_IMAGE,
  POST_STAFF_TO_LIST_SUCCESS,
  PUT_STAFF_TO_LIST_SUCCESS,
} from "app/redux/actionTypeConstant/StaffActionTypeConstant.js";
import { takeLatest, put, call } from "redux-saga/effects";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});
function* searchByPage(action) {
  try {
    const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + "employee/search", { params: { ...action.payload } });
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
    const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `employee/${action.payload}`);
    if (checkResponseCode(data?.code)) {
      yield put({ type: SET_SHOULD_UPDATE });
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
    //uploadImage
    console.log("addStaff");
    let image = "";
    if (action?.payload?.file) {
      const { data } = yield call(
        axios.post,
        ConstantList.API_ENDPOINT + `employee/upload-image`,
        action?.payload?.file
      );
      if (data?.id) {
        image = data?.name ? ConstantList.API_ENDPOINT + `/public/image/${data?.name}` : "";
      } else {
        toast.error("Thêm ảnh không thành công");
      }
    }
    //create staff with image
    const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "/employee",
      {
        ...action?.payload?.staff,
        image: image,
        employeeFamilyDtos: [],
        certificatesDto: []
      }
    );
    if (checkResponseCode(data?.code)) {
      yield put({ type: POST_STAFF_TO_LIST_SUCCESS, payload: data?.data });
      toast.success("Tạo thông tin nhân viên thành công");
    } else {
      toast.error(data?.message);
    }

  } catch (err) {
    toast.error(err);
  }
}
function* updateStaff(action) {
  try {
    //uploadImage
    let image = "";
    if (action?.payload?.file) {
      const { data } = yield call(
        axios.post,
        ConstantList.API_ENDPOINT + `employee/upload-image`,
        action?.payload?.file
      );
      if (data?.id) {
        image = data?.name ? ConstantList.API_ENDPOINT + `/public/image/${data?.name}` : "";
      } else {
        toast.error("Thêm ảnh không thành công");
      }
    }
    //update staff with image
    const { data } = yield call(
      axios.put,
      ConstantList.API_ENDPOINT + `/employee/${action?.payload?.staff?.id}`,
      {
        ...action?.payload?.staff,
        image: image
      }
    );
    if (checkResponseCode(data?.code)) {
      toast.success("Chỉnh sửa thông tin nhân viên thành công!");
      yield put({ type: PUT_STAFF_TO_LIST_SUCCESS, payload: data?.data });
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
