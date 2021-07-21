import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Routers from './Routers';
import theme from './Theme';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </Router>
  );
}
