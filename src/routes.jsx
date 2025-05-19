import { createBrowserRouter } from 'react-router-dom'
import App from './components/App'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Checkout from './pages/Checkout'

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
      {
        path: '/checkout',
        element: <Checkout />,
      },
    ],
  },
])
