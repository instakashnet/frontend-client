import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";

import classes from "./modules/accordion.module.scss";

const AccordionComponent = ({ className, title, children, Icon, ...rest }) => {
  return (
    <Accordion className={classes.Accordion} {...rest}>
      <AccordionSummary expandIcon={<Icon />} aria-controls="accounts" className={className}>
        <h3>{title}</h3>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
