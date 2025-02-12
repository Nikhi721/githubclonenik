
import { createRoot } from 'react-dom/client'
import './index.css'

import { AuthProvider } from './authContext.jsx'
import ProjectRoutes from './Routes.jsx';
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <Router>
    <ProjectRoutes />
  </Router>
</AuthProvider>
);

