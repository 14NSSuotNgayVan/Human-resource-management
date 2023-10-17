import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Dashboard.addStaff",
    isVisible: true,
    path: ConstantList.ROOT_PATH + "staff_manager/AddStaff",
    icon: "person"
  },
  {
    name: "Dashboard.LeadershipApproval",
    isVisible: true,
    path: ConstantList.ROOT_PATH + "staff_manager/LeadershipApproval",
    icon: "receipt"
  }

];
