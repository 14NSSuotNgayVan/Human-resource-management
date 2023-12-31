import { checkResponseCode } from 'app/constants/apiCodeStatus';
import axios from 'axios';
import ConstantList from "../../appConfig";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_PROCESS, GET_PROCESS, GET_PROCESS_BY_LEADER, GET_PROCESS_FAIL, GET_PROCESS_SUCCESS, POST_PROCESS, SET_SHOULD_UPDATE_PROCESS, UPDATE_PROCESS } from '../actionTypeConstant/ProcessActionTypeConstant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
function* getProcessByLeader(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/process/current-leader');
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_PROCESS_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_PROCESS_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* getProcessByEmployeeId(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/process', { params: { employeeId: action.payload } });
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_PROCESS_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_PROCESS_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* createProcess(action) {
    try {
        const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "process", action?.payload?.Process, {
            params: {employeeId: action?.payload?.employeeId}
        });
        if (checkResponseCode(data.code)) {
            toast.success("Tạo mới thành công");
            yield put({
                type: SET_SHOULD_UPDATE_PROCESS,
            })
        } else toast.error(data.message);
    } catch (err) { toast.error(err); }
}
function* updateProcess(action){
    try{
        const { data } = yield call(axios.put, ConstantList.API_ENDPOINT + `process/${action?.payload?.id}`, action?.payload);
        if (checkResponseCode(data.code)) {
            toast.success("Cập nhật thành công");
            yield put({
                type: SET_SHOULD_UPDATE_PROCESS,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
function* deleteProcess(action){
    try{
        const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `process/${action?.payload}`);
        if (checkResponseCode(data.code)) {
            toast.success("Xóa thành công");
            yield put({
                type: SET_SHOULD_UPDATE_PROCESS,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
export function* ProcessSaga() {
    yield takeLatest(GET_PROCESS, getProcessByEmployeeId);
    yield takeLatest(GET_PROCESS_BY_LEADER, getProcessByLeader);
    yield takeLatest(POST_PROCESS, createProcess);
    yield takeLatest(UPDATE_PROCESS, updateProcess);
    yield takeLatest(DELETE_PROCESS, deleteProcess);

}