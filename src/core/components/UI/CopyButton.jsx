import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from 'react-feather';
import Tooltip from './Tooltip';

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
    <Tooltip className='ml-2 cursor-pointer' open={open} onClose={handleClose} disableFocusListener disableHoverListener disableTouchListener placement='top-end' title='¡Copiado!'>
      <CopyToClipboard text={textToCopy}>
        <Copy className='cursor-pointer' size={20} onClick={handleOpen} />
      </CopyToClipboard>
    </Tooltip>
  );
};

export default CopyButton;
