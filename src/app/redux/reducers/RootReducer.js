import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import StaffReducer  from "./StaffReducer";
import CertificateReducer from "./CertificateReducer";
import FamilyReducer from "./FamilyReducer";

const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  staff:StaffReducer,
  certificate: CertificateReducer,
  family: FamilyReducer
});

export default RootReducer;