import React from 'react'
import { render, fireEvent } from '@testing-library/react'


import { FiltersContext } from '../../../context/filters'
import { FiltersWrapper } from '../../../components/FiltersWrapper'

describe('The <FiltersWrapper /> component', () => {
  const hide_filter = 'Hide Filter'
  const show_filter = 'Show Filter'
  const setupFilters = () => render(
    <FiltersWrapper>
    <FiltersContext.Consumer>
     {({toggleShowingFilters, showingFilters} ) => {
       return (
         <button onClick={toggleShowingFilters}>{showingFilters ? show_filter: hide_filter}</button>
       )
     }}
    </FiltersContext.Consumer>
    </FiltersWrapper>)
  it('should render all children passed to it', () => {
    const {getByTestId} = render(
    <FiltersWrapper>
     <div data-testid="filtertest">testing children</div>
    </FiltersWrapper>)
    
    expect(getByTestId('filtertest')).toBeInTheDocument()
  })

  it(' should update the filters context with correct state values', () => {
    const {getByText} = setupFilters()

    expect(getByText(hide_filter)).toBeInTheDocument();
    fireEvent.click(getByText(hide_filter))
    expect(getByText(show_filter)).toBeInTheDocument();
  })

 it(' should update the body style to prevent scrolling when filter is toggled', () => {
    const {getByText, debug} = setupFilters()

    fireEvent.click(getByText(hide_filter))
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(getByText(show_filter))
    expect(document.body.style.overflow).toBe('scroll');
 })
  
})
