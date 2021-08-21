import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FileCopy } from "@material-ui/icons";
import Tooltip from "./tooltip.component";

const CopyButton = ({ textToCopy }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let timeout;
    if (open) timeout = setTimeout(() => setOpen(false), 1500);
    return () => clearTimeout(timeout);
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Tooltip className="ml-2 cursor-pointer" open={open} onClose={handleClose} disableFocusListener disableHoverListener disableTouchListener placement="top-end" title="¡Copiado!">
      <CopyToClipboard text={textToCopy}>
        <button type="button" onClick={handleOpen}>
          <FileCopy className="cursor-pointer" fontSize="small" />
        </button>
      </CopyToClipboard>
    </Tooltip>
  );
};

export default CopyButton;
