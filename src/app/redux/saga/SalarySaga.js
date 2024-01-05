import { checkResponseCode } from 'app/constants/apiCodeStatus';
import axios from 'axios';
import ConstantList from "../../appConfig";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_SALARY, GET_SALARY, GET_SALARY_BY_LEADER, GET_SALARY_FAIL, GET_SALARY_SUCCESS, POST_SALARY, SET_SALARY, SET_SHOULD_UPDATE_SALARY, UPDATE_SALARY } from '../actionTypeConstant/SalaryActionTypeConstant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
function* getSalariesByLeader(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/salary-increase/current-leader');
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_SALARY_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_SALARY_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* getSalariesByEmployeeId(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/salary-increase', { params: { employeeId: action.payload } });
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_SALARY_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_SALARY_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* createSalaries(action) {
    try {
        const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "salary-increase", action?.payload?.Salaries, {
            params: {employeeId: action?.payload?.employeeId}
        });
        if (checkResponseCode(data.code)) {
            toast.success("Tạo mới thành công");
            yield put({
                type: SET_SHOULD_UPDATE_SALARY,
            })
            yield put({
                type: SET_SALARY,
                payload: data.data[0]
            })
        } else toast.error(data.message);
    } catch (err) { toast.error(err); }
}
function* updateSalary(action){
    try{
        const { data } = yield call(axios.put, ConstantList.API_ENDPOINT + `salary-increase/${action?.payload?.id}`, action?.payload);
        if (checkResponseCode(data.code)) {
            toast.success("Cập nhật thành công");
            yield put({
                type: SET_SHOULD_UPDATE_SALARY,
            })
            yield put({
                type: SET_SALARY,
                payload: data.data
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
function* deleteSalary(action){
    try{
        const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `salary-increase/${action?.payload}`);
        if (checkResponseCode(data.code)) {
            toast.success("Xóa thành công");
            yield put({
                type: SET_SHOULD_UPDATE_SALARY,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
export function* SalarySaga() {
    yield takeLatest(GET_SALARY, getSalariesByEmployeeId);
    yield takeLatest(GET_SALARY_BY_LEADER, getSalariesByLeader);
    yield takeLatest(POST_SALARY, createSalaries);
    yield takeLatest(UPDATE_SALARY, updateSalary);
    yield takeLatest(DELETE_SALARY, deleteSalary);

}