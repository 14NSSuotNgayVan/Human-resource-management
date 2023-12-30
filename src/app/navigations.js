import ConstantList from "./appConfig";
export const navigations = [
  {
    name:"Dashboard.manage",
    isVisible: true,
    icon: "person",
    children:[
      {
        name: "Dashboard.addStaff",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/AddStaff",
      },
      {
        name: "Dashboard.manageStaff",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/ManageStaff",
      },
    ]
  },
  {
    name:"Dashboard.leader",
    isVisible: true,
        icon: "receipt",
    children:[
      {
        name: "Dashboard.LeadershipApproval",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/LeadershipApproval",
      },
      {
        name: "Dashboard.LeadershipApproved",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/LeadershipApproved",
      }
    ]
  },

];
