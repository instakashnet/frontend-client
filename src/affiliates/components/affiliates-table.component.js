import React from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import classes from "../assets/css/affiliates-components.module.scss";

export const AffiliatesTable = ({ columns }) => {
  return (
    <Grid
      data={[]}
      columns={columns}
      pagination={{ enabled: true, limit: 5 }}
      search
      sort
      className={{
        container: classes.ContainerTable,
        footer: classes.FooterTable,
        th: classes.ThTable,
        td: classes.TdTable,
      }}
    />
  );
};
