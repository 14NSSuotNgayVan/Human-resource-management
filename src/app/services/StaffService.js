import axios from "axios";
import ConstantList from "app/appConfig";

export const getListStaff = async () => {
    return await axios.get(ConstantList.API_ENDPOINT + '/api/employees/all');
}
export const exPortListStaff = async () => {
    const data = await fetch(ConstantList.API_ENDPOINT + '/api/employees/export-data')
    // const blob = await data.blob();
    return data.blob();
}
export const addStaff = async (data) => {
    return await axios.post(ConstantList.API_ENDPOINT + '/api/employees', data)
}

export const updateStaff = async (id, data) => {
    return await axios.put(ConstantList.API_ENDPOINT + `/api/employees/${id}`, data)
}
export const deleteStaff = async (id) => {
    return await axios.delete(ConstantList.API_ENDPOINT + `/api/employees/${id}`)
}

export const searchByPage = async (searchObj) => {
    return await axios.post(ConstantList.API_ENDPOINT + '/api/employees/page', searchObj);
};
export const getStaffById = async id => {
    return await axios.get(ConstantList.API_ENDPOINT + `/api/employees/${id}`);
};
export const getStaffExperience = async id=>{
    return await axios.get(ConstantList.API_ENDPOINT + `/experience?employeeId=${id}`);
}
// address


export const getAllProvince = async () => {
    const {data:{data}} = await axios.get(ConstantList.API_ENDPOINT + `/api/provinces/all`);
    return data;
}

export const getWardsByDistrictId = async (id) => {
    const {data:{data}} = await  axios.get(ConstantList.API_ENDPOINT + `/api/districts/${id}/wards`);
    return data;
}

export const getDistrictsByProvinceId = async (id) => {
    const {data:{data}} = await  axios.get(ConstantList.API_ENDPOINT + `/api/provinces/${id}/districts`);
    return data;
}
