import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { UserProvider } from './app/context/UserContext';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
