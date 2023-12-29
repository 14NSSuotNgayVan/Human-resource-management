import { DELETE_EXPERIENCE, GET_EXPERIENCE, POST_EXPERIENCE, SET_EXPERIENCE, UPDATE_EXPERIENCE } from "../actionTypeConstant/ExperienceActionTypeConstant"

export const getAllExperiences =(employeeTd)=>{
    return {
        type: GET_EXPERIENCE,
        payload: employeeTd
    }
}
export const createExperiences =(employeeId,Experiences)=>{
    return {
        type:POST_EXPERIENCE,
        payload: {
            employeeId: employeeId,
            experiences: [{...Experiences}]},

    }
}
export const updateExperience =(Experience)=>{
    return {
        type : UPDATE_EXPERIENCE,
        payload: Experience
    }
}
export const deleteExperience =(ExperienceId)=>{
    return {
        type: DELETE_EXPERIENCE,
        payload:ExperienceId
    }
}
export const setExperience =(Experience)=>{
    return {
        type:SET_EXPERIENCE,
        payload:{...Experience}

    }
}