import React from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import classes from "../assets/css/activity-components.module.scss";

const ActivityTable = ({ data, columns }) => {
  return (
    <Grid
      data={data}
      columns={columns}
      pagination={{ enabled: true, limit: 5 }}
      className={{
        container: classes.ContainerTable,
        footer: classes.FooterTable,
        th: classes.ThTable,
        td: classes.TdTable,
      }}
      language={{
        pagination: {
          previous: "Anterior",
          next: "Siguiente",
          showing: "Mostrando",
          results: () => "registros",
          of: "de",
          to: "-",
          loading: "Cargando...",
          noRecordsFound: "No se han encotrado registros.",
        },
      }}
    />
  );
};

export default ActivityTable;
