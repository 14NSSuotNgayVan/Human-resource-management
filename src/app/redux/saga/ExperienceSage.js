import { checkResponseCode } from 'app/constants/apiCodeStatus';
import axios from 'axios';
import ConstantList from "../../appConfig";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_EXPERIENCE, GET_EXPERIENCE, GET_EXPERIENCE_FAIL, GET_EXPERIENCE_SUCCESS, POST_EXPERIENCE, SET_SHOULD_UPDATE_EXPERIENCE, UPDATE_EXPERIENCE } from '../actionTypeConstant/ExperienceActionTypeConstant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
function* getExperiencesByEmployeeId(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/experience', { params: { employeeId: action.payload } });
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_EXPERIENCE_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_EXPERIENCE_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* createExperiences(action) {
    try {
        const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "experience", action?.payload?.experiences, {
            params: {employeeId: action?.payload?.employeeId}
        });
        if (checkResponseCode(data.code)) {
            toast.success("Tạo mới kinh nghiệm thành công");
            yield put({
                type: SET_SHOULD_UPDATE_EXPERIENCE,
            })
        } else toast.error(data.message);
    } catch (err) { toast.error(err); }
}
function* updateExperience(action){
    try{
        const { data } = yield call(axios.put, ConstantList.API_ENDPOINT + `experience/${action?.payload?.id}`, action?.payload);
        if (checkResponseCode(data.code)) {
            toast.success("Cập nhật kinh nghiệm thành công");
            yield put({
                type: SET_SHOULD_UPDATE_EXPERIENCE,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
function* deleteExperience(action){
    try{
        const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `experience/${action?.payload}`);
        if (checkResponseCode(data.code)) {
            toast.success("Xóa thành công");
            yield put({
                type: SET_SHOULD_UPDATE_EXPERIENCE,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
export function* ExperienceSaga() {
    yield takeLatest(GET_EXPERIENCE, getExperiencesByEmployeeId);
    yield takeLatest(POST_EXPERIENCE, createExperiences);
    yield takeLatest(UPDATE_EXPERIENCE, updateExperience);
    yield takeLatest(DELETE_EXPERIENCE, deleteExperience);

}