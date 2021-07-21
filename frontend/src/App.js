import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import Routers from './Routers';
import theme from './Theme';

axios.defaults.baseURL = 'http://localhost:4000/';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </Router>
  );
}
