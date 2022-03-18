import React from "react";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";

import classes from "./modules/affiliates-table.module.scss";

export const AffiliatesTable = ({ columns, data }) => {
  return (
    <>
      <Grid
        data={data}
        columns={columns}
        pagination={{ enabled: true, limit: 5 }}
        search
        sort
        className={{
          container: classes.ContainerTable,
          footer: classes.FooterTable,
          header: classes.HeaderTable,
          search: classes.SearchTable,
          th: classes.ThTable,
          thead: classes.TheadTable,
          tr: classes.TrTable,
          td: classes.TdTable,
          pagination: classes.PaginationTable,
          paginationButtonCurrent: classes.PaginationButtonCurrent,
          paginationButtonNext: classes.PaginationButtonNext,
          paginationButtonPrev: classes.PaginationButtonPrev,
        }}
        language={{
          pagination: {
            previous: "Anterior",
            next: "Siguiente",
            showing: "Mostrando",
            results: () => "afiliados",
            of: "de",
            to: "-",
            noRecordsFound: "No se han encontrado afiliados.",
          },
          search: {
            placeholder: "Buscar referido",
          },
          noRecordsFound: "No se ha encontrado ningún afiliado.",
        }}
      />
      <div className={classes.FilterButtons}>
        <button>Registrados</button>
        <button>Completados</button>
      </div>
    </>
  );
};
