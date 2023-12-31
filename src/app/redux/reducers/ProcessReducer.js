import { GET_PROCESS, GET_PROCESS_FAIL, GET_PROCESS_SUCCESS, SET_SHOULD_UPDATE_PROCESS } from "../actionTypeConstant/ProcessActionTypeConstant";

const initState = {
    processItem:{},
    processList:[],
    totalElements: 0,
    shouldUpdate: false,
};

const ProcessReducer=(state =initState, action)=>{
    switch(action?.type){
        case GET_PROCESS :{
            return {
                ...state,
                processItem:action?.payload,
            }
        }
        case GET_PROCESS_SUCCESS :{
            return {
                ...state,
                processList:action?.payload,
                shouldUpdate: false,
            }
        }
        case GET_PROCESS_FAIL :{
            return {
                ...state,
                processList:[],
                shouldUpdate: false,
            }
        }
        case SET_SHOULD_UPDATE_PROCESS:{
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
export default ProcessReducer;