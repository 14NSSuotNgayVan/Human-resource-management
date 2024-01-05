import { GET_SALARY_FAIL, GET_SALARY_SUCCESS, SET_SALARY, SET_SHOULD_UPDATE_SALARY } from "../actionTypeConstant/SalaryActionTypeConstant";

const initState = {
    salaryItem:{},
    salaryList:[],
    totalElements: 0,
    shouldUpdate: false,
};

const SalaryReducer=(state =initState, action)=>{
    switch(action?.type){
        case SET_SALARY :{
            return {
                ...state,
                salaryItem:action?.payload,
                shouldUpdate: false,
            }
        }
        case GET_SALARY_SUCCESS :{
            return {
                ...state,
                salaryList:action?.payload,
                shouldUpdate: false,
            }
        }
        case GET_SALARY_FAIL :{
            return {
                ...state,
                salaryList:[],
                shouldUpdate: false,
            }
        }
        case SET_SHOULD_UPDATE_SALARY:{
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
export default SalaryReducer;