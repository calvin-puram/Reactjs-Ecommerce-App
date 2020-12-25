import React from 'react'
import { axe } from 'jest-axe'
import { render, fireEvent } from '@testing-library/react'
import ReactDom from 'react-dom'

import Checkbox from '../../../components/Checkbox'

describe('The <Checkbox /> component', () => {
  const CheckboxProps = {
    label: 'checkbox checker',
    id: 'checkbox',
    checked: false,
    background: '#000',
    checkMarkBackground: '#fff',
    onChange: jest.fn(),
  }
  const setupCheckBox = (props = CheckboxProps) =>
    render(<Checkbox {...props} />)
  it(' Should render the label and checkbox the user will see', () => {
    const { asFragment } = setupCheckBox()
    expect(asFragment()).toMatchSnapshot()
  })

  it(' Should make the checkbox accessible by setting the id and htmlFor attributes on label and checkbox', () => {
    const { getByLabelText } = setupCheckBox()
    expect(getByLabelText(CheckboxProps.label)).toBeInTheDocument()
  })

  it('Should call the onChange handler when it is provided', () => {
    const { getByLabelText } = setupCheckBox()
    fireEvent.click(getByLabelText(CheckboxProps.label))

    expect(CheckboxProps.onChange).toHaveBeenCalled()
  })

  it('Should change state correctly when clicked (checked and unchecked)', () => {
    const { getByLabelText } = setupCheckBox({
      ...CheckboxProps,
      checked: true,
    })

    expect(getByLabelText(CheckboxProps.label)).toBeChecked()
  })

  it('should not fail any accessibility tests', async () => {
    const { container } = setupCheckBox()

    expect(await axe(container)).toHaveNoViolations()
  })
})
