import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation} from 'react-i18next';
const Leadership = EgretLoadable({
  loader: () => import("./LeadershipApproved")
});
const ViewComponent = withTranslation()(Leadership);

const LeadershipApprovedRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"staff_manager/LeadershipApproved",
    exact: true,
    component: ViewComponent
  }
];

export default LeadershipApprovedRoutes;