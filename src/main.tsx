import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@src/pages/App';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
