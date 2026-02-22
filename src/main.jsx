import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Widget from '@hexlet/chatbot-v2';
// import steps from "../__fixtures__/minimalSteps.js";
import '@hexlet/chatbot-v2/styles';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* {Widget(steps)} */}
  </StrictMode>
)
