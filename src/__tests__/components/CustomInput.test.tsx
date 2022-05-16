import React from 'react'
import { render, screen } from '@testing-library/react'
import { CustomInput } from '../../components/CustomInput'
import { FiPhone } from 'react-icons/fi'

describe('CustomInput', () => {
  it('should render the component', async () => {
    render(<CustomInput icon={FiPhone} />)
    const customInput = await screen.findByTestId('custom-input')

    expect(customInput).toBeInTheDocument()
  })
})
