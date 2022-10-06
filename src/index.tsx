import 'nprogress/nprogress.css';
import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import analytics from './utils/analytics';
import client from './utils/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals(analytics.sendToAnalytics);
