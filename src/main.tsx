import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore Space Grotesk
import '@fontsource-variable/space-grotesk';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
