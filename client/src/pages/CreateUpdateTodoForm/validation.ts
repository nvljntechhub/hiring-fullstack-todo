import { help } from 'src/utils/properties';
import { object, string } from 'yup';

const validationSchema = () =>
  object().shape({
    title: string().required(help.VALUE_REQUIRED)
  });

export default validationSchema;
