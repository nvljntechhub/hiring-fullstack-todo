import TextInput from './TextInput';

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case 'text':
      return <TextInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
