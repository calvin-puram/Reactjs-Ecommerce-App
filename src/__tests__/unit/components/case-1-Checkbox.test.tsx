import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'
import ReactDom from 'react-dom'
// import jest from 'jest'

import Checkbox from '../../../components/Checkbox'

/**
 * This checkbox component renders a checkbox with a label.
 * Since we customized the default checkbox, we want to
 * make sure it still works as a regular checkbox
 * should.
 */
describe('The <Checkbox /> component', () => {
  const CheckboxProps = {
    label: 'checkbox checker',
    id: 'checkbox',
    checked: false,
    background: '#000',
    checkMarkBackground: '#fff',
    onChange: jest.fn(),
  }
  const setupCheckBox = () => render(<Checkbox {...CheckboxProps} />)
  it(' Should render the label and checkbox the user will see', () => {
    const { asFragment } = setupCheckBox()
    expect(asFragment()).toMatchSnapshot()
  })

  it(' Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText, debug } = setupCheckBox()
    expect(getByLabelText(CheckboxProps.label)).toBeInTheDocument()
  })

  it('❌ Should call the onChange handler when it is provided', () => {})

  it('❌ Should change state correctly when clicked (checked and unchecked)', () => {})

  it('❌ should not fail any accessibility tests', async () => {})
})
