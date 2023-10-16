import { checkResponseCode } from 'app/constants/apiCodeStatus';
import axios from 'axios';
import ConstantList from "../../appConfig";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_FAMILY_MEMBER, GET_ALL_FAMILY_MEMBERS, GET_ALL_FAMILY_MEMBERS_FAIL, GET_ALL_FAMILY_MEMBERS_SUCCESS, POST_FAMILY_MEMBER, SET_SHOULD_UPDATE_FAMILY, UPDATE_FAMILY_MEMBER } from '../actionTypeConstant/FamilyActionTypeConstant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
function* getFamilyMembersByEmployeeId(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/employee-family', { params: { employeeId: action.payload } });
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_ALL_FAMILY_MEMBERS_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_ALL_FAMILY_MEMBERS_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* createFamilyMember(action) {
    try {
        const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "/employee-family", action?.payload?.certificates, {
            params: {employeeId: action?.payload?.employeeId}
        });
        if (checkResponseCode(data.code)) {
            toast.success("Tạo mới quan hệ thành công");
            yield put({
                type: SET_SHOULD_UPDATE_FAMILY,
            })
        } else toast.error(data.message);
    } catch (err) { toast.error(err); }
}
function* updateFamilyMember(action){
    try{
        const { data } = yield call(axios.put, ConstantList.API_ENDPOINT + `employee-family/${action?.payload?.id}`, action?.payload );
        if (checkResponseCode(data.code)) {
            toast.success("Cập nhật quan hệ thành công");
            yield put({
                type: SET_SHOULD_UPDATE_FAMILY,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
function* deleteFamilyMember(action){
    try{
        const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `employee-family/${action?.payload}`);
        if (checkResponseCode(data.code)) {
            toast.success("Xóa thành công");
            yield put({
                type: SET_SHOULD_UPDATE_FAMILY,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
export function* FamilySaga() {
    yield takeLatest(GET_ALL_FAMILY_MEMBERS, getFamilyMembersByEmployeeId);
    yield takeLatest(POST_FAMILY_MEMBER, createFamilyMember);
    yield takeLatest(UPDATE_FAMILY_MEMBER, updateFamilyMember);
    yield takeLatest(DELETE_FAMILY_MEMBER, deleteFamilyMember);

}