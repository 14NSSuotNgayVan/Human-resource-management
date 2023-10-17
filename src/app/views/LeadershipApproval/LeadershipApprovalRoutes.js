import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation} from 'react-i18next';
const Leadership = EgretLoadable({
  loader: () => import("./LeadershipApproval")
});
const ViewComponent = withTranslation()(Leadership);

const LeadershipApprovalRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"staff_manager/LeadershipApproval",
    exact: true,
    component: ViewComponent
  }
];

export default LeadershipApprovalRoutes;