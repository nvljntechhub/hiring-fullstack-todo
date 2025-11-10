import { useRoutes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

export default function CustomRoutes() {
  return useRoutes([...AppRoutes]);
}
