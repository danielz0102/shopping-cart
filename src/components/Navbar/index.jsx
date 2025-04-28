import { Link } from 'react-router-dom'
import Cart from '../Cart'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <Cart
        initialProducts={[
          {
            id: 1,
            title: 'Product 1',
            image: 'https://example.com/image1.jpg',
            price: 10,
            quantity: 1,
          },
        ]}
        onCheckout={() => {}}
      />
    </nav>
  )
}
