import { DELETE_SALARY, GET_SALARY, GET_SALARY_BY_LEADER, POST_SALARY, SET_SALARY, UPDATE_SALARY } from "../actionTypeConstant/SalaryActionTypeConstant"

export const getAllSalaries =(employeeTd)=>{
    return {
        type: GET_SALARY,
        payload: employeeTd
    }
}
export const getAllSalariesByLeader =()=>{
    return {
        type: GET_SALARY_BY_LEADER,
        payload: {}
    }
}
export const createSalaries =(employeeId,Salaries)=>{
    return {
        type:POST_SALARY,
        payload: {
            employeeId: employeeId,
            Salaries: [{...Salaries}]},

    }
}
export const updateSalary =(Salary)=>{
    return {
        type : UPDATE_SALARY,
        payload: Salary
    }
}
export const deleteSalary =(SalaryId)=>{
    return {
        type: DELETE_SALARY,
        payload:SalaryId
    }
}
export const setSalary =(Salary)=>{
    return {
        type:SET_SALARY,
        payload:{...Salary}

    }
}