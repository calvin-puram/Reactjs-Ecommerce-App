import React from 'react'
import { render, fireEvent } from '@testing-library/react'


import { FiltersContext } from '../../../context/filters'
import { FiltersWrapper } from '../../../components/FiltersWrapper'

describe('The <FiltersWrapper /> component', () => {
  it('should render all children passed to it', () => {
    const {getByTestId} = render(
    <FiltersWrapper>
     <div data-testid="filtertest">testing children</div>
    </FiltersWrapper>)
    
    expect(getByTestId('filtertest')).toBeInTheDocument()
  })

  it(' should update the filters context with correct state values', () => {
    const hide_filter = 'Hide Filter'
    const show_filter = 'Show Filter'
    const {getByText} = render(
    <FiltersWrapper>
    <FiltersContext.Consumer>
     {({toggleShowingFilters, showingFilters} ) => {
       return (
         <button onClick={toggleShowingFilters}>{showingFilters ? show_filter: hide_filter}</button>
       )
     }}
    </FiltersContext.Consumer>
    </FiltersWrapper>)

    expect(getByText(hide_filter)).toBeInTheDocument();
    fireEvent.click(getByText(hide_filter))
    expect(getByText(show_filter)).toBeInTheDocument();
  })

  
})
