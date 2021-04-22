import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#E1F2EC',
    color: '#676767',
    maxWidth: 230,
    fontSize: theme.typography.pxToRem(14),
    padding: 10,
    borderRadius: '10px',
  },
}))(Tooltip);

export default HtmlTooltip;
