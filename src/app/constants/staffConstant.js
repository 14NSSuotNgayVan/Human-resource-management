export const NAME_REGEX = "^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
export const ADDRESS_REGEX = "^[a-z0-9A-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s\/\,]+$";
export const GENDER = [
    { id: 0, name: "other" },
    { id: 1, name: "male" },
    { id: 2, name: "female" }
];

export const ADD_STAFF_TABS = {
    INFORMATION: {
        value :1,
        name : "information"
    },
    CERTIFICATES:{
        value :2,
        name : "certificates"
    },
    RELATIONSHIP:{
        value :3,
        name : "family_relationship"
    }
}
export const MANAGE_STAFF_TABS = {
    SALARY_INCREMENT: {
        value :1,
        name : "salary_increment"
    },
    PROMOTION:{
        value :2,
        name : "promotion"
    }
}
export const LEADERSHIP_APPROVAL_TABS ={
    PENDING:{
        value :1,
        name:"pending"
    },
    SALARY_INCREMENT:{
        value:2,
        name:"salary_increment"
    },
    PROMOTION:{
        value:3,
        name:"promotion"
    },
    PROPOSAL:{
        value:4,
        name:"proposal"
    },
    FINISH:{
        value:5,
        name:"finish"
    }
}
export const DOCUMENT_TABS = {
    DOCUMENTS:{
        value:1,
        name:"documents"
    },
    RESUME:{
        value :2,
        name :"resume"
    },
    CERTIFICATES:{
        value :3,
        name : "certificates"
    },
};
export const SUBMIT_PROFILE_STATUS = [
    "savedProfile", //value 0
    "addNew", //value 1
    "sendingLeader", //value 2
    "accepted", //value 3
    "additionalRequest", //value 4
    "rejected", //value 5
    "sendingEndProfile", //value 6
    "endProfileAccepted", //value 7
    "endProfileAdditionalRequest", //value 8
    "EndProfileRejected", //value 9
];

export const TEAM = [
    { id: 0, name: 'BA' },
    { id: 1, name: 'BackEnd' },
    { id: 2, name: 'FrontEnd - ReactJs' },
    { id: 3, name: 'Tester' },
    { id: 4, name: 'FrontEnd - ASP.NET' },
    { id: 5, name: 'Mobile - ReactNative' },
];

export const STAFF_STATUS = {
    NEW: "1",
    ADD: "1,2,4,5",
    REMOVE: "1",
    EDIT: "1,4,5,3,8,9",
    VIEW: "2,6,3,8,9",
    APPROVED:"0,3,7",
    ADDITIONAL:"4,8",
    REJECT:"5,9",
    MANAGE:"3,6,8,9",
    EDIT_PROCESS:"1,4,5",
    PENDING:"2",
    END_PROFILE_PROCESS:"6",
    VIEW_END_PROFILE:"7,0",
    EDIT_END_PROFILE:"7"

}
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
export const LEADER_POSITION=[
    {name: "Trưởng nhóm BA",id:0},
    {name: "Trưởng nhóm Tester",id:1},
    {name: "Trưởng nhóm Front-End",id:2},
    {name: "Trưởng nhóm Back-End",id:3},
    {name: "Trưởng nhóm PHP",id:4},
    {name: "Trưởng nhóm Android",id:5},
]
export const STAFF_POSITION =[
    {name:"Nhân viên",id:1},
    {name:"Phó nhóm",id:2},
    {name:"Trưởng nhóm",id:3},
    {name:"Phó phòng",id:4},
    {name:"Trưởng phòng",id:5},
    {name:"Phó giám đốc",id:6},
    {name:"Giám đốc",id:7},
]