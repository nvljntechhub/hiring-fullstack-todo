import { DialogTitle, Grid, IconButton, useTheme } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import { actionTitleString } from 'src/utils/properties';
import { ModalAction } from 'src/enum';
import { FC } from 'react';
import { ModalTitle } from './Styled';

const ModalHeader: FC<{
  action: ModalAction;
  module: string;
  handleClose: () => void;
}> = ({ action, module, handleClose }) => {
  return (
    <>
      <Grid size={11}>
        <ModalTitle>
          {actionTitleString[action]} {module}
        </ModalTitle>
      </Grid>
      <Grid size={1}>
        <Grid container justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <HighlightOff sx={{ color: '#75838A' }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ModalHeader;
