import React from 'react'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'
import ProductTile from '../../../components/ProductTile'

describe('The <ProductTile /> component', () => {
  const productProps = {
    name: 'product test',
    image: 'product image',
    price: '200',
  }

  const setupProduct = () => render(<ProductTile {...(productProps as any)} />)
  it('renders a product tile with name, image and price', () => {
    const { getByAltText, getByText } = setupProduct()

    expect(getByAltText(productProps.name)).toBeInTheDocument()
    expect(getByText(productProps.name)).toBeInTheDocument()
    expect(getByText(productProps.price)).toBeInTheDocument()
  })

  it('renders a product tile with name and price only', () => {
    productProps.image = ''
    const { queryByAltText, getByText } = setupProduct()

    expect(queryByAltText(productProps.name)).toBeNull()
    expect(getByText(productProps.name)).toBeInTheDocument()
    expect(getByText(productProps.price)).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const {container} = setupProduct()

    expect(await axe(container)).toHaveNoViolations()
  })
})
