export const NAME_REGEX = "^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
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
export const LEADERSHIP_APPROVAL_TABS = {
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
    EDIT: "1,4,5",
    VIEW: "2"
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

