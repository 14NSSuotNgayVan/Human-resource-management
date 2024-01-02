import ConstantList from "./appConfig";
import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name:"Dashboard.dashboard",
    isVisible: true,
    icon: "home",
    role: authRoles.guest,
    path: ConstantList.ROOT_PATH + "home/Home",

  },
  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "person",
    role: authRoles.user,
    children: [
      {
        role: authRoles.user,
        name: "Dashboard.addStaff",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/AddStaff",
      },
      {
        role: authRoles.user,
        name: "Dashboard.manageStaff",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/ManageStaff",
      },
      {
        role: authRoles.user,
        name: "Dashboard.endStaff",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "staff_manager/EndStaff",
      },
    ]
  },
  {
    name: "Dashboard.leader",
    isVisible: true,
    icon: "receipt",
    role: authRoles.manage,
    children: [
      {
        role: authRoles.manage,
        name: "Dashboard.LeadershipApproval",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/LeadershipApproval",
      },
      {
        role: authRoles.manage,
        name: "Dashboard.LeadershipApproved",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/LeadershipApproved",
      }
    ]
  },

];
