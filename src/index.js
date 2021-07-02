import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/scss/styles.scss";
import appStore from './store';
import { Provider } from 'react-redux';

const store = appStore();

Sentry.init({
    dsn: "https://5ad063c50f6544fb8da194a2882004d3@o879743.ingest.sentry.io/5832705",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
