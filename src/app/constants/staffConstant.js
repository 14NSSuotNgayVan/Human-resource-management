export const NAME_REGEX = "^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
export const CERTIFICATE_REGEX = "^[a-z0-9A-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
export const ADDRESS_REGEX = "^[a-z0-9A-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s/,]+$";
export const GENDER = [
    { id: 0, name: "other" },
    { id: 1, name: "male" },
    { id: 2, name: "female" }
];

export const ADD_STAFF_TABS = {
    INFORMATION: {
        value: 1,
        name: "information"
    },
    CERTIFICATES: {
        value: 2,
        name: "certificates"
    },
    RELATIONSHIP: {
        value: 3,
        name: "family_relationship"
    }
}
export const MANAGE_STAFF_TABS = {
    SALARY_INCREMENT: {
        value: 1,
        name: "salary_increment"
    },
    PROMOTION: {
        value: 2,
        name: "promotion"
    }
}
export const LEADERSHIP_APPROVAL_TABS = {
    PENDING: {
        value: 1,
        name: "pending"
    },
    SALARY_INCREMENT: {
        value: 2,
        name: "salary_increment"
    },
    PROMOTION: {
        value: 3,
        name: "promotion"
    },
    PROPOSAL: {
        value: 4,
        name: "proposal"
    },
    FINISH: {
        value: 5,
        name: "finish"
    }
}
export const DOCUMENT_TABS = {
    DOCUMENTS: {
        value: 1,
        name: "documents"
    },
    RESUME: {
        value: 2,
        name: "resume"
    },
    CERTIFICATES: {
        value: 3,
        name: "certificates"
    },
};
export const SUBMIT_PROFILE_STATUS = {
    NOP_LUU: { NAME: "savedProfile", ID: 0 },
    LUU_MOI: { NAME: "addNew", ID: 1 },
    CHO_DUYET_DANG_KY: { NAME: "sendingLeader", ID: 2 },
    DA_DUYET_DANG_KY: { NAME: "accepted", ID: 3 },
    BO_SUNG_DANG_KY: { NAME: "additionalRequest", ID: 4 },
    TU_CHOI_DANG_KY: { NAME: "rejected", ID: 5 },
    CHO_DUYET_KET_THUC: { NAME: "sendingEndProfile", ID: 6 },
    DA_DUYET_KET_THUC: { NAME: "endProfileAccepted", ID: 7 },
    BO_SUNG_KET_THUC: { NAME: "endProfileAdditionalRequest", ID: 8 },
    TU_CHOI_KET_THUC: { NAME: "EndProfileRejected", ID: 9 },
};

export const STATUS_FOR_NEW = [
    SUBMIT_PROFILE_STATUS.LUU_MOI.ID //1
];
export const STATUS_FOR_ADD = [
    SUBMIT_PROFILE_STATUS.LUU_MOI.ID,//1
    SUBMIT_PROFILE_STATUS.CHO_DUYET_DANG_KY.ID,//2
    SUBMIT_PROFILE_STATUS.BO_SUNG_DANG_KY.ID,//4
    SUBMIT_PROFILE_STATUS.TU_CHOI_DANG_KY.ID,//5
];
export const STATUS_FOR_REMOVE = [SUBMIT_PROFILE_STATUS.LUU_MOI.ID];

export const STATUS_FOR_EDIT = [
    SUBMIT_PROFILE_STATUS.LUU_MOI.ID,//1
    SUBMIT_PROFILE_STATUS.DA_DUYET_DANG_KY.ID,//3
    SUBMIT_PROFILE_STATUS.BO_SUNG_DANG_KY.ID,//4
    SUBMIT_PROFILE_STATUS.TU_CHOI_DANG_KY.ID,//5
    SUBMIT_PROFILE_STATUS.BO_SUNG_KET_THUC.ID,//8
    SUBMIT_PROFILE_STATUS.TU_CHOI_KET_THUC.ID,//9
];
export const STATUS_FOR_VIEW = [
    SUBMIT_PROFILE_STATUS.CHO_DUYET_DANG_KY.ID,//2
    SUBMIT_PROFILE_STATUS.CHO_DUYET_KET_THUC.ID,//6
    SUBMIT_PROFILE_STATUS.TU_CHOI_DANG_KY.ID,//5
    SUBMIT_PROFILE_STATUS.BO_SUNG_KET_THUC.ID,//8
    SUBMIT_PROFILE_STATUS.TU_CHOI_KET_THUC.ID,//9
];
export const STATUS_FOR_APPROVED = [
    SUBMIT_PROFILE_STATUS.DA_DUYET_DANG_KY.ID,//3
    SUBMIT_PROFILE_STATUS.DA_DUYET_KET_THUC.ID,//7
    SUBMIT_PROFILE_STATUS.NOP_LUU.ID,//0
];
export const STATUS_FOR_ADDITIONAL = [
    SUBMIT_PROFILE_STATUS.BO_SUNG_DANG_KY.ID,//4
    SUBMIT_PROFILE_STATUS.BO_SUNG_KET_THUC.ID,//8
];
export const STATUS_FOR_REJECT = [
    SUBMIT_PROFILE_STATUS.TU_CHOI_DANG_KY.ID,//5
    SUBMIT_PROFILE_STATUS.TU_CHOI_KET_THUC.ID,//9
];
export const STATUS_FOR_MANAGE = [
    SUBMIT_PROFILE_STATUS.DA_DUYET_DANG_KY.ID,//3
    SUBMIT_PROFILE_STATUS.CHO_DUYET_KET_THUC.ID,//6
    SUBMIT_PROFILE_STATUS.BO_SUNG_KET_THUC.ID,//8
    SUBMIT_PROFILE_STATUS.TU_CHOI_KET_THUC.ID,//9

];
export const STATUS_FOR_EDIT_PROCESS = [
    SUBMIT_PROFILE_STATUS.LUU_MOI.ID,//1
    SUBMIT_PROFILE_STATUS.BO_SUNG_DANG_KY.ID,//4
    SUBMIT_PROFILE_STATUS.TU_CHOI_DANG_KY.ID,//5
    1, 4,
];
export const STATUS_FOR_PENDING = [
    SUBMIT_PROFILE_STATUS.CHO_DUYET_DANG_KY.ID,//2
    SUBMIT_PROFILE_STATUS.CHO_DUYET_KET_THUC.ID,//6
];
export const STATUS_FOR_END_PROFILE_PROCESS = [
    SUBMIT_PROFILE_STATUS.CHO_DUYET_KET_THUC.ID,//6
];
export const STATUS_FOR_VIEW_END_PROFILE = [
    SUBMIT_PROFILE_STATUS.DA_DUYET_KET_THUC.ID,//7
    SUBMIT_PROFILE_STATUS.NOP_LUU.ID,//0
];
export const STATUS_FOR_EDIT_END_PROFILE = [
    SUBMIT_PROFILE_STATUS.DA_DUYET_KET_THUC.ID,//7
];
export const STATUS_FOR_VIEW_MANAGE = [
    SUBMIT_PROFILE_STATUS.CHO_DUYET_DANG_KY.ID,//2
    SUBMIT_PROFILE_STATUS.DA_DUYET_DANG_KY.ID,//3
    SUBMIT_PROFILE_STATUS.BO_SUNG_DANG_KY.ID,//4
    SUBMIT_PROFILE_STATUS.TU_CHOI_DANG_KY.ID,//5
];
export const STATUS_FOR_VIEW_PENDING = [
    SUBMIT_PROFILE_STATUS.CHO_DUYET_DANG_KY.ID,//2
];

export const STAFF_STATUS = {
    NEW: "1",
    ADD: "1,2,4,5",
    REMOVE: "1",
    EDIT: "1,4,5,3,8,9",
    VIEW: "2,6,3,8,9",
    APPROVED: "0,3,7",
    ADDITIONAL: "4,8",
    REJECT: "5,9",
    MANAGE: "3,6,8,9",
    EDIT_PROCESS: "1,4,5",
    PENDING: "2,6",
    END_PROFILE_PROCESS: "6",
    VIEW_END_PROFILE: "7,0",
    EDIT_END_PROFILE: "7",
    VIEW_MANAGE: "2,3,4,5",
    VIEW_PENDING: "2"

}
export const TEAM = [
    { id: 0, name: 'BA' },
    { id: 1, name: 'BackEnd' },
    { id: 2, name: 'FrontEnd - ReactJs' },
    { id: 3, name: 'Tester' },
    { id: 4, name: 'FrontEnd - ASP.NET' },
    { id: 5, name: 'Mobile - ReactNative' },
];


export const RELATIONSHIP = [
    {
        id: 0,
        name: "Bố/Mẹ"
    },
    {
        id: 1,
        name: "Anh/Chị"
    },
    {
        id: 2,
        name: "Em"
    },
    {
        id: 3,
        name: "Vợ/Chồng"
    },
    {
        id: 4,
        name: "Họ hàng"
    },
    {
        id: 5,
        name: "Người bảo hộ/ nhận nuôi"
    },
    {
        id: 6,
        name: "Ông/Bà"
    },
    {
        id: 7,
        name: "Khác"
    },
]

export const LEADER = [
    {
        "id": 36,
        "leaderName": "Nguyen Van B",
        "leaderPosition": 3,
        "activeStatus": 1,
        "userId": 7
    },
    {
        "id": 35,
        "leaderName": "Nguyen Van E",
        "leaderPosition": 3,
        "activeStatus": 2,
        "userId": 6
    },
    {
        "id": 34,
        "leaderName": "Nguyen Van D",
        "leaderPosition": 3,
        "activeStatus": 1,
        "userId": 5
    },
    {
        "id": 2,
        "leaderName": "Nguyen Van C",
        "leaderPosition": 2,
        "activeStatus": 1,
        "userId": 4
    },
    {
        "id": 1,
        "leaderName": "Nguyen Van A",
        "leaderPosition": 4,
        "activeStatus": 1,
        "userId": 3
    }
]
export const LEADER_POSITION = [
    { name: "Trưởng nhóm BA", id: 0 },
    { name: "Trưởng nhóm Tester", id: 1 },
    { name: "Trưởng nhóm Front-End", id: 2 },
    { name: "Trưởng nhóm Back-End", id: 3 },
    { name: "Trưởng nhóm PHP", id: 4 },
    { name: "Trưởng nhóm Android", id: 5 },
]
export const STAFF_POSITION = [
    { name: "Nhân viên", id: 1 },
    { name: "Phó nhóm", id: 2 },
    { name: "Trưởng nhóm", id: 3 },
    { name: "Phó phòng", id: 4 },
    { name: "Trưởng phòng", id: 5 },
    { name: "Phó giám đốc", id: 6 },
    { name: "Giám đốc", id: 7 },
]