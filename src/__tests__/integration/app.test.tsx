import React from 'react'
import { Axios } from '../../helpers/axios'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import { Provider as StoreProvider } from 'react-redux'
import { build, fake } from '@jackfranklin/test-data-bot'

import App from '../../components/App'
import { createStore } from '../../store'
import { FiltersWrapper } from '../../components/FiltersWrapper'

jest.mock('../../helpers/axios')
const mockAxios = Axios as any

describe('The app ', () => {
  const setupApp = () => render(
      <StoreProvider store={createStore() as any}>
        <FiltersWrapper>
          <App />
        </FiltersWrapper>
      </StoreProvider>
    )
  test(' it fetches and renders all products on the page', async () => {
    mockAxios.get.mockResolvedValue({
      data: [
        {
          id: 1232233,
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
          id: 12322398,
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
      ],
    })

    const { findAllByTestId } = setupApp()
    expect(await findAllByTestId('ProductTile')).toHaveLength(2);
  })

  test(' it can open and close the filters panel', async () => {
     const { getByText, queryByText } = setupApp()

     expect(queryByText(/Reset to defaults/i)).not.toBeInTheDocument();
     fireEvent.click(getByText(/filter/i))
     expect(queryByText(/Reset to defaults/i)).toBeInTheDocument();
     fireEvent.click(getByText(/view Results/i))
     expect(queryByText(/Reset to defaults/i)).not.toBeInTheDocument();
  })

  
})
