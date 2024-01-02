import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { withTranslation} from 'react-i18next';
const Home = EgretLoadable({
    loader: () => import("./Home")
  });
  const ViewComponent = withTranslation()(Home);
  
  const HomeRoutes = [
    {
      path:  ConstantList.ROOT_PATH+"home/Home",
      exact: true,
      component: ViewComponent
    }
  ];
  
  export default HomeRoutes;