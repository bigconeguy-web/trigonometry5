import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isScramjetScope } from './utils/valbrowseConfig';

try {
  if (
    typeof navigator !== 'undefined' &&
    'serviceWorker' in navigator &&
    typeof navigator.serviceWorker.getRegistrations === 'function'
  ) {
    navigator.serviceWorker
      .getRegistrations()
      .then((regs) => {
        regs.forEach((reg) => {
          try {
            if (!isScramjetScope(reg.scope, window.location.origin)) {
              void reg.unregister();
            }
          } catch {
            // ignore
          }
        });
      })
      .catch(() => {});
  }
} catch {
  // ignore
}

createRoot(document.getElementById('root')!).render(<App />);
