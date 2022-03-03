import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Collapse } from "@material-ui/core";

import classes from "./modules/mui-alert.module.scss";

export const MuiAlert = ({ type, opened, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(opened);

  return (
    <Collapse in={isOpen}>
      <Alert onClose={() => setIsOpen(false)} severity={type} classes={{ root: classes.MuiAlert }} {...rest}>
        {children}
      </Alert>
    </Collapse>
  );
};
