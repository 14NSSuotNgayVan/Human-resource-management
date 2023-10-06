export const provincesSelector = (state) => state.address.listProvinces;
export const provinceTotalElementsSelector = (state) => state.address.totalProvinceElement;
export const shouldProvinceUpdateSelector = (state) => state.address.shouldProvinceUpDate;

export const districtsSelector = (state) => state.address.listDistricts;
export const districtTotalElementsSelector = (state) => state.address.totalDistrictElement;
export const shouldDistrictUpdateSelector = (state) => state.address.shouldDistrictUpDate;

export const wardsSelector = (state) => state.address.listWards;
export const wardTotalElementsSelector = (state) => state.address.totalWardElement;
export const shouldWardUpdateSelector = (state) => state.address.shouldWardUpDate;
