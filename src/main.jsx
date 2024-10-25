import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Calender from './components/calender/Calender.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Calender />
  </StrictMode>,
)
