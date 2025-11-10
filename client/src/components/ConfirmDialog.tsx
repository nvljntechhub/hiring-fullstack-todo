import { Modal, Grid } from '@mui/material';
import {
  StyledDeleteConfirmDialogBox,
  DeleteConfirmTitleGridItem,
  MessageTextGridItem,
  ConfirmationButton,
  CancelButton
} from './Styled';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  message: string;
  buttonTitle: string;
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { onClose, open, onSubmit, title, message, buttonTitle } = props;

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    handleClose();
    onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledDeleteConfirmDialogBox>
        <Grid container rowSpacing={2} columnSpacing={1} flexGrow={1}>
          <DeleteConfirmTitleGridItem title={title} />
          <MessageTextGridItem message={message} />
        </Grid>
        <Grid container spacing={2} justifyContent="flex-start" mt={2}>
          <Grid>
            <ConfirmationButton onClick={handleSubmit}>
              {buttonTitle}
            </ConfirmationButton>
          </Grid>
          <Grid>
            <CancelButton onClick={handleClose} />
          </Grid>
        </Grid>
      </StyledDeleteConfirmDialogBox>
    </Modal>
  );
}
