const { GET_CERTIFICATES_SUCCESS, GET_CERTIFICATES_FAIL, SET_SHOULD_UPDATE_CERTIFICATE } = require("./actionTypeConstant/CertificateActionTypeConstant");

const initState = {
    certificateList:[],
    totalElements: 0,
    shouldUpdate: false,
};

const CertificateReducer=(state =initState, action)=>{
    switch(action?.type){
        case GET_CERTIFICATES_SUCCESS :{
            return {
                ...state,
                certificateList:action?.payload,
                shouldUpdate: false,
            }
        }
        case GET_CERTIFICATES_FAIL :{
            return {
                ...state,
                certificateList:[],
                shouldUpdate: false,
            }
        }
        case SET_SHOULD_UPDATE_CERTIFICATE:{
            return {
                ...state,
                shouldUpdate: true,
            }
        }
        default :{
            return state
        }
    }
};
export default CertificateReducer;