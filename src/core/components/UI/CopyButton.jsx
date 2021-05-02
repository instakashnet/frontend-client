import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from 'react-feather';

const CopyButton = ({ textToCopy }) => {
  return (
    <CopyToClipboard text={textToCopy}>
      <Copy className='ml-2 cursor-pointer' size={20} />
    </CopyToClipboard>
  );
};

export default CopyButton;
