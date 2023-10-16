import { GET_ALL_FAMILY_MEMBERS_FAIL, GET_ALL_FAMILY_MEMBERS_SUCCESS, SET_SHOULD_UPDATE_FAMILY } from "../actionTypeConstant/FamilyActionTypeConstant";

const initState = {
    familyMemberList: [],
    totalElements: 0,
    shouldUpdate: false,
};

const FamilyReducer = (state = initState, action) => {
    switch (action?.type) {
        case GET_ALL_FAMILY_MEMBERS_SUCCESS: {
            return {
                ...state,
                familyMemberList: action?.payload,
                shouldUpdate: false,
            }
        }
        case GET_ALL_FAMILY_MEMBERS_FAIL: {
            return {
                ...state,
                familyMemberList: [],
                shouldUpdate: false,
            }
        }
        case SET_SHOULD_UPDATE_FAMILY: {
            return {
                ...state,
                shouldUpdate: true,
            }
        }
        default: {
            return state
        }
    }
};
export default FamilyReducer;