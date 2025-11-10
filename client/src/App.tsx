import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import routes from './routes';
import CustomRoutes from './routes';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <CustomRoutes />
    </ThemeProvider>
  );
}

export default App;
