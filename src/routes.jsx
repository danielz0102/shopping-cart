import { createBrowserRouter } from 'react-router-dom'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import Shop from './components/Shop.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
    ],
  },
])
