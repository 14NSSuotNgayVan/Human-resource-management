import { checkResponseCode } from 'app/constants/apiCodeStatus';
import axios from 'axios';
import ConstantList from "../../appConfig";
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_CERTIFICATES, GET_CERTIFICATES, GET_CERTIFICATES_FAIL, GET_CERTIFICATES_SUCCESS, POST_CERTIFICATES, SET_SHOULD_UPDATE_CERTIFICATE, UPDATE_CERTIFICATES } from '../reducers/actionTypeConstant/CertificateActionTypeConstant';

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});
function* getCertificatesByEmployeeId(action) {
    try {
        const { data } = yield call(axios.get, ConstantList.API_ENDPOINT + '/certificate', { params: { employeeId: action.payload } });
        if (checkResponseCode(data.code)) {
            if (data.data) {
                yield put({
                    type: GET_CERTIFICATES_SUCCESS,
                    payload: data.data
                })
            } else yield put({ type: GET_CERTIFICATES_FAIL });
        } else toast.error(data.message);
    } catch (err) {
        toast.error(err);
    }
}
function* createCertificates(action) {
    try {
        const { data } = yield call(axios.post, ConstantList.API_ENDPOINT + "certificate", action?.payload?.certificates, {
            params: {employeeId: action?.payload?.employeeId}
        });
        if (checkResponseCode(data.code)) {
            toast.success("Tạo mới văn bằng thành công");
            yield put({
                type: SET_SHOULD_UPDATE_CERTIFICATE,
            })
        } else toast.error(data.message);
    } catch (err) { toast.error(err); }
}
function* updateCertificate(action){
    try{
        const { data } = yield call(axios.put, ConstantList.API_ENDPOINT + `certificate/${action?.payload?.id}`, action?.payload );
        if (checkResponseCode(data.code)) {
            toast.success("Cập nhật văn bằng thành công");
            yield put({
                type: SET_SHOULD_UPDATE_CERTIFICATE,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
function* deleteCertificate(action){
    try{
        const { data } = yield call(axios.delete, ConstantList.API_ENDPOINT + `certificate/${action?.payload}`);
        if (checkResponseCode(data.code)) {
            toast.success("Xóa thành công");
            yield put({
                type: SET_SHOULD_UPDATE_CERTIFICATE,
            })
        } else toast.error(data.message);
    }catch(err){toast.error(err);}
}
export function* CertificateSaga() {
    yield takeLatest(GET_CERTIFICATES, getCertificatesByEmployeeId);
    yield takeLatest(POST_CERTIFICATES, createCertificates);
    yield takeLatest(UPDATE_CERTIFICATES, updateCertificate);
    yield takeLatest(DELETE_CERTIFICATES, deleteCertificate);

}