import createCache from '@emotion/cache';
import { CacheProvider } from "@emotion/react";
import { Router } from './routes';
import { ThemeProvider } from "@mui/material";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { createTheme } from './theme';

const muiCache = createCache({
  'key': 'mui',
  'prepend': true,
});
  
const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={muiCache}>
        <GoogleAnalytics />
        <Router />
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;