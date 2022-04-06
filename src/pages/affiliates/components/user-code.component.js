import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Tooltip from "../../../components/UI/tooltip.component";
import classes from "./modules/user-code.module.scss";

const UserCode = ({ userCode }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timeout;
    if (open) timeout = setTimeout(() => setOpen(false), 1500);
    return () => clearTimeout(timeout);
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={classes.UserCode}>
      <p>{userCode}</p>
      <Tooltip
        className="ml-2 cursor-pointer"
        open={open}
        onClose={handleClose}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        placement="top-end"
        title="¡Copiado!"
      >
        <CopyToClipboard text={userCode} onCopy={handleOpen}>
          <span>Copiar</span>
        </CopyToClipboard>
      </Tooltip>
    </div>
  );
};

export default React.memo(UserCode);
