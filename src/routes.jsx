import { createBrowserRouter } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import Shop from './components/Shop'
import Checkout from './components/Checkout'

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
