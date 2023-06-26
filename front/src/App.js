import { ThemeProvider } from '@mui/system';
import theme from './theme/Theme';
import Router from './router/Router';
import { Provider } from 'react-redux';
import { store } from './app/store';

import './App.css';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router/>
      </ThemeProvider>
    </Provider>
  )
}

export default App;