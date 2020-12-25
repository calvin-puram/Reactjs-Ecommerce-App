import React from 'react'
import { axe } from 'jest-axe'
import { render } from '@testing-library/react'
import ProductStream from '../../../components/ProductStream'

describe('The <ProductStream /> component', () => {
  const product = [
    {
      id: 12323,
    image: 'https://calvin',
      name: 'new addidas',
      price: 'from $230',
      isSoldOut: false,
      isActive: true,
      createdAt: '2020-07-02T13:59:07+02:00',
      brand: 'Marke',
      isNew: true,
      priceUnformatted: 2299,
    },
    {
      id: 12323,
      image: 'https://calvin',
      name: 'new addidas',
      price: 'from $230',
      isSoldOut: false,
      isActive: true,
      createdAt: '2020-07-02T13:59:07+02:00',
      brand: 'Marke',
      isNew: true,
      priceUnformatted: 2299,
    },
  ]
  it(' renders a list of Product tiles for each product passed to it', async () => {
    const {getAllByTestId} = render(<ProductStream products={...product as any} />)
    expect(getAllByTestId('ProductTile')).toHaveLength(product.length);
  })

  it('has no accessibility violations', async () => {
    const {container} = render(<ProductStream products={...product as any} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
