import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation} from 'react-i18next';
const Staff = EgretLoadable({
  loader: () => import("./ManageStaff")
});
const ViewComponent = withTranslation()(Staff);

const ManageStaffRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"staff_manager/ManageStaff",
    exact: true,
    component: ViewComponent
  }
];

export default ManageStaffRoutes;