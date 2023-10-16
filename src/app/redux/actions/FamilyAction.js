import { DELETE_FAMILY_MEMBER, GET_ALL_FAMILY_MEMBERS, POST_FAMILY_MEMBER, UPDATE_FAMILY_MEMBER } from "../actionTypeConstant/FamilyActionTypeConstant"

export const getAllFamilyMembers = (employeeTd) => {
    return {
        type: GET_ALL_FAMILY_MEMBERS,
        payload: employeeTd
    }
}
export const createFamilyMember = (employeeId, certificates) => {
    return {
        type: POST_FAMILY_MEMBER,
        payload: {
            employeeId: employeeId,
            certificates: [{ ...certificates }]
        },

    }
}
export const updateFamilyMember = (certificate) => {
    return {
        type: UPDATE_FAMILY_MEMBER,
        payload: certificate
    }
}
export const deleteFamilyMember = (certificateId) => {
    return {
        type: DELETE_FAMILY_MEMBER,
        payload: certificateId
    }
}