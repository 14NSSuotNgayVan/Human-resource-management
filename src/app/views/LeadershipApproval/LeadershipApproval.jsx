import React, { useCallback, useState } from "react";
import { searchByPageAction, deleteStaffAction, setItem } from "app/redux/actions/StaffActions.js";
import { Grid, IconButton, Icon, Button, FormControl, Input, InputAdornment, Tab, Tabs } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Breadcrumb } from "egret";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { staffListSelector, totalElementsSelector, shouldUpdateSelector } from "app/redux/selectors/StaffSelector.js";
import moment from "moment";
import {
  GENDER,
  LEADERSHIP_APPROVAL_TABS,
  STAFF_STATUS,
  SUBMIT_PROFILE_STATUS,
  TEAM,
} from "app/constants/staffConstant.js";
import CustomTable from "app/component/CustomTable";
import LeadershipApprovalDialog from "./Tabs/PedingApprovalDialog";
import PendingApproval from "./Tabs/PendingApproval";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function LeadershipApproval({ t }) {
  const [tab, setTab] = useState(LEADERSHIP_APPROVAL_TABS.PENDING.value);

  return (
    <div className="m-sm-24">
      <div className="mb-sm-24 sm-hide">
        <Breadcrumb
          routeSegments={[{ name: t("Dashboard.LeadershipApproval"), path: "staff_manager/LeadershipApproval" }]}
        />
      </div>
      <Tabs
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
        className=""
        onChange={(event, newValue) => {
          setTab(newValue);
        }}
      >
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS.PENDING.name}`)}
          value={LEADERSHIP_APPROVAL_TABS.PENDING.value}
        />
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS.SALARY_INCREMENT.name}`)}
          value={LEADERSHIP_APPROVAL_TABS.SALARY_INCREMENT.value}
        />
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS.PROMOTION.name}`)}
          value={LEADERSHIP_APPROVAL_TABS.PROMOTION.value}
        />
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS.PROPOSAL.name}`)}
          value={LEADERSHIP_APPROVAL_TABS.PROPOSAL.value}
        />
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS.FINISH.name}`)}
          value={LEADERSHIP_APPROVAL_TABS.FINISH.value}
        />
      </Tabs>
      {tab === LEADERSHIP_APPROVAL_TABS.PENDING.value && <PendingApproval t={t} />}
    </div>
  );
}
export default LeadershipApproval;
