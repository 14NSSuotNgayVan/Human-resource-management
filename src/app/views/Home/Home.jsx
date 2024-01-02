import { Grid } from "@material-ui/core";
import { Breadcrumb } from "egret";
import React from "react";
import { Helmet } from "react-helmet";

function Home({t}) {
  return (
    <div className="analytics m-sm-30">
      <div className="mb-sm-30">
        <Helmet>
          <title>
            {t('Dashboard.dashboard')} | {t('web_site')}
          </title>
        </Helmet>

        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ id: 1, name: t('Dashboard.dashboard') }]} />
        </div>
      </div>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}></Grid>
      </Grid>
    </div>

  );
}
export default Home;
