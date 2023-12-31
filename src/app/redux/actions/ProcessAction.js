import { DELETE_PROCESS, GET_PROCESS, GET_PROCESS_BY_LEADER, POST_PROCESS, SET_PROCESS, UPDATE_PROCESS } from "../actionTypeConstant/ProcessActionTypeConstant"

export const getAllProcess =(employeeTd)=>{
    return {
        type: GET_PROCESS,
        payload: employeeTd
    }
}
export const getAllProcessByLeader =()=>{
    return {
        type: GET_PROCESS_BY_LEADER,
        payload: {}
    }
}
export const createProcess =(employeeId,Process)=>{
    return {
        type:POST_PROCESS,
        payload: {
            employeeId: employeeId,
            Process: [{...Process}]},

    }
}
export const updateProcess =(Process)=>{
    return {
        type : UPDATE_PROCESS,
        payload: Process
    }
}
export const deleteProcess =(ProcessId)=>{
    return {
        type: DELETE_PROCESS,
        payload:ProcessId
    }
}
export const setProcess =(Process)=>{
    return {
        type:SET_PROCESS,
        payload:{...Process}

    }
}