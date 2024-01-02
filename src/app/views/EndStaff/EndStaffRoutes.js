import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation} from 'react-i18next';
const Staff = EgretLoadable({
  loader: () => import("./EndStaff")
});
const ViewComponent = withTranslation()(Staff);

const EndStaffRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"staff_manager/EndStaff",
    exact: true,
    component: ViewComponent
  }
];

export default EndStaffRoutes;