import { Grid, TextField } from '@mui/material';
import { LabelText } from '../Styled';

function TextInput(props) {
  const { label, formikProps, ...rest } = props;
  const fieldProps = formikProps.getFieldProps(rest.name);
  const meta = formikProps.getFieldMeta(rest.name);

  const configTextfield = {
    ...fieldProps,
    ...rest
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <>
      <Grid container>
        {label && (
          <Grid size={12}>
            <LabelText>{label}</LabelText>
          </Grid>
        )}
        <Grid size={12}>
          <TextField
            {...configTextfield}
            placeholder={props.placeholder}
            multiline={configTextfield.multiline}
            rows={props.rows}
            component={props.component}
            sx={{
              ...props.sx,
              '& input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px #FCFEFF inset',
                WebkitTextFillColor: '#000',
                height: 'none'
              }
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}

export default TextInput;
