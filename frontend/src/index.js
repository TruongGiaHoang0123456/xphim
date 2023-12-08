import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

// react-toolkit & redux
import { Provider } from 'react-redux';
import { store, persistor } from './reducer/store';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="81856327199-ggmn64mt31qpijd0qg6jv4lodgt7e1jb.apps.googleusercontent.com">
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);
