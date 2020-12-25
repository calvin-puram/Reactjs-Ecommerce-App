import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Header from '../../../components/Header'
import { FiltersContext } from '../../../context/filters'

describe('The Header component', () => {
  const defaultContext = {
   toggleShowingFilters:jest.fn()
  }

  const setupHeader = (value = defaultContext) => render(
    <FiltersContext.Provider value={...value as any}>
      <Header />
    </FiltersContext.Provider>
    )

  it(' renders header correctly', () => {
    const {asFragment} = setupHeader();

    expect(asFragment()).toMatchSnapshot()
  })

  it('toggles the filter open when the Filter button is clicked', () => {
     const {getByText} = setupHeader();
     fireEvent.click(getByText(/filter/i));
     expect(defaultContext.toggleShowingFilters).toHaveBeenCalled()
  })
})
