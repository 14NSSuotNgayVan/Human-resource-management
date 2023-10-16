import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation} from 'react-i18next';
const Staff = EgretLoadable({
  loader: () => import("./AddStaff")
});
const ViewComponent = withTranslation()(Staff);

const StaffRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"staff_manager/AddStaff",
    exact: true,
    component: ViewComponent
  }
];

export default StaffRoutes;