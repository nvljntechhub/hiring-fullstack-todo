import { Modal, Box, Grid, Alert, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import ModalHeader from 'src/components/ModalHeader';
import { modalStyle, StyledErrorAlert } from 'src/components/Styled';
import { ModalAction } from 'src/enum';
import { Todo } from 'src/models/todo.interface';
import { initialValues } from './CreateUpdateTodoForm/initialValues';
import validationSchema from './CreateUpdateTodoForm/validation';
import FormikControl from 'src/components/InputControls/FormikControl';
import { IOSSwitch, SubmitButton } from 'src/components/Styled/Todos';
import { createTodo, updateTodo } from 'src/services/todo.service';
import { useSnackbar } from 'notistack';

const CreateAndUpdateModal: FC<{
  updatingTodo: Todo;
  action: ModalAction;
  isCreateUpdateModalOpen: boolean;
  handleCloseCreateUpdateModal: () => void;
}> = ({
  updatingTodo,
  action,
  isCreateUpdateModalOpen,
  handleCloseCreateUpdateModal
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const isUpdate = action === ModalAction.UPDATE;

  const handleSubmit = async (values: Todo) => {
    console.log('values', values);
    try {
      const response: any = isUpdate
        ? await updateTodo(values)
        : await createTodo(values);
      enqueueSnackbar(response.message, { variant: 'success' });
      handleClose();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const formik = useFormik({
    initialValues: isUpdate ? updatingTodo : initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true
  });

  const handleClose = () => {
    handleCloseCreateUpdateModal();
    formik.resetForm();
  };

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) =>
    formik.setFieldValue('done', event.target.checked);

  return (
    <Modal
      open={isCreateUpdateModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Grid container rowSpacing={1}>
          <ModalHeader
            action={action}
            handleClose={handleClose}
            module="Todo"
          />
          {errorMessage && (
            <Grid size={12}>
              <StyledErrorAlert title={errorMessage} />
            </Grid>
          )}
          <Grid size={12} m={1}>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                alignItems="center"
                columnSpacing={2}
                rowSpacing={2}
              >
                <Grid size={12}>
                  <FormikControl
                    control="text"
                    label="Title"
                    name="title"
                    formikProps={formik}
                  />
                </Grid>
                {/* <Grid size={2}>
                  <FormControlLabel
                    control={
                      <IOSSwitch
                        checked={formik.values.done}
                        onChange={handleSwitchChange}
                      />
                    }
                    label={formik.values.done ? 'Done' : 'Undone'}
                  />
                </Grid> */}
                <Grid size={12}>
                  <FormikControl
                    control="text"
                    label="Description"
                    name="description"
                    formikProps={formik}
                    multiline={true}
                    rows={2}
                  />
                </Grid>
                <Grid size={12}>
                  <Grid container justifyContent="flex-end">
                    <SubmitButton />
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CreateAndUpdateModal;
