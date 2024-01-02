import React from "react";
import { Redirect } from "react-router-dom";
import sessionRoutes from "./views/sessions/SessionRoutes";
import ConstantList from "./appConfig";
// import MenuRoutes from "./views/Menus/MenuRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";  
import StaffRoutes from "./views/AddStaff/AddStaffRoutes"
import LeadershipApprovalRoutes from "./views/LeadershipApproval/LeadershipApprovalRoutes";
import LeadershipApprovedRoutes from "./views/LeadershipApproved/LeadershipApprovedRoutes";
import ManageStaffRoutes from "./views/ManageStaff/ManageStaffRoutes";
import EndStaffRoutes from "./views/EndStaff/EndStaffRoutes";
import HomeRoutes from "./views/Home/HomeRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.ROOT_PATH +"home/Home"} /> //Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  }
];

const routes = [
  ...redirectRoute,
  ...sessionRoutes,
  ...pageLayoutRoutes,  
  ...StaffRoutes,
  ...LeadershipApprovalRoutes,
  ...LeadershipApprovedRoutes,
  ...ManageStaffRoutes,
  ...EndStaffRoutes,
  ...HomeRoutes,
  ...errorRoute,

];

export default routes;
