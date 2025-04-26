import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Product from './Product'

describe('Product', () => {
  it('renders props correctly', () => {
    const product = {
      image: 'https://example.com/image.jpg',
      title: 'Test Product',
      description: 'This is a test product.',
      price: 19.99,
    }

    render(<Product product={product} />)

    expect(screen.getByRole('img')).toHaveAttribute('src', product.image)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      product.title,
    )
    expect(screen.getByText(product.description)).toBeInTheDocument()
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument()
  })
})
