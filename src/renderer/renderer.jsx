// Module imports
import { createRoot } from 'react-dom/client'





// Local imports
import './styles/reset.scss'
import './styles/app.scss'
import { App } from './components/App/App.jsx'





// Render your React component instead
const root = createRoot(document.body)
root.render(<App />)
