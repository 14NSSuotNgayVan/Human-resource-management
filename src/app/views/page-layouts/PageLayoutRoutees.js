import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import {withTranslation} from 'react-i18next';

const LeftSidebarLayout = EgretLoadable({
  loader: () => import("./LeftSidebarCard")
});

const Home = EgretLoadable({
  loader: () => import("../Home/Home")
});
const ViewComponent = withTranslation()(Home);

const pageLayoutRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"page-layouts/Left-sidebar-card",
    component: LeftSidebarLayout
  },
  {
    path:  ConstantList.ROOT_PATH+"home/Home",
    component: ViewComponent
  }
];

export default pageLayoutRoutes;
