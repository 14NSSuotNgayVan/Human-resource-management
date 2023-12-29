import { GET_EXPERIENCE_FAIL, GET_EXPERIENCE_SUCCESS, SET_EXPERIENCE, SET_SHOULD_UPDATE_EXPERIENCE } from "../actionTypeConstant/ExperienceActionTypeConstant";

const initState = {
    experienceItem:{},
    ExperienceList:[],
    totalElements: 0,
    shouldUpdate: false,
};

const ExperienceReducer=(state =initState, action)=>{
    switch(action?.type){
        case SET_EXPERIENCE :{
            return {
                ...state,
                experienceItem:action?.payload,
            }
        }
        case GET_EXPERIENCE_SUCCESS :{
            return {
                ...state,
                ExperienceList:action?.payload,
                shouldUpdate: false,
            }
        }
        case GET_EXPERIENCE_FAIL :{
            return {
                ...state,
                ExperienceList:[],
                shouldUpdate: false,
            }
        }
        case SET_SHOULD_UPDATE_EXPERIENCE:{
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
export default ExperienceReducer;