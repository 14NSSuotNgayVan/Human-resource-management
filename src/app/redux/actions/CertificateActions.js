import { DELETE_CERTIFICATES, GET_CERTIFICATES, POST_CERTIFICATES, UPDATE_CERTIFICATES } from "../reducers/actionTypeConstant/CertificateActionTypeConstant"

export const getAllCertificates =(employeeTd)=>{
    return {
        type: GET_CERTIFICATES,
        payload: employeeTd
    }
}
export const createCertificates =(employeeId,certificates)=>{
    return {
        type:POST_CERTIFICATES,
        payload: {
            employeeId: employeeId,
            certificates: [{...certificates}]},

    }
}
export const updateCertificate =(certificate)=>{
    return {
        type : UPDATE_CERTIFICATES,
        payload: certificate
    }
}
export const deleteCertificate =(certificateId)=>{
    return {
        type: DELETE_CERTIFICATES,
        payload:certificateId
    }
}