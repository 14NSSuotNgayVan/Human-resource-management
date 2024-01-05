import React, {useState } from "react";
import {Tab, Tabs } from "@material-ui/core";
import { Breadcrumb } from "egret";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LEADERSHIP_APPROVAL_TABS,

} from "app/constants/staffConstant.js";
import PendingApproval from "./Tabs/PendingApproval";
import PendingSalaryIncrement from "./Tabs/PendingSalaryIncrement";
import PendingPromotion from "./Tabs/PendingPromotion";
import PendingEndProfile from "./Tabs/PendingEndProfile";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

function LeadershipApproval({ t }) {
  const [tab, setTab] = useState(LEADERSHIP_APPROVAL_TABS?.PENDING?.value);

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
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS?.PENDING?.name}`)}
          value={LEADERSHIP_APPROVAL_TABS?.PENDING?.value}
        />
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS?.SALARY_INCREMENT?.name}`)}
          value={LEADERSHIP_APPROVAL_TABS?.SALARY_INCREMENT?.value}
        />
        <Tab
          label={t(`leaderShipApproval.${LEADERSHIP_APPROVAL_TABS?.PROMOTION?.name}`)}
          value={LEADERSHIP_APPROVAL_TABS?.PROMOTION?.value}
        />
      </Tabs>
      <div className="p-16">
      {tab === LEADERSHIP_APPROVAL_TABS?.PENDING?.value && <PendingApproval t={t} />}
      {tab === LEADERSHIP_APPROVAL_TABS?.SALARY_INCREMENT?.value && <PendingSalaryIncrement t={t} />}
      {tab === LEADERSHIP_APPROVAL_TABS?.PROMOTION?.value && <PendingPromotion t={t} />}
      </div>
    </div>
  );
}
export default LeadershipApproval;
