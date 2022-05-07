import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Renders main page correctly', async () => {
    render(<App />)
    const buttonCount = await screen.findByRole('button')
    const codeCount = screen.queryByText(/The count is now:/i)

    expect(buttonCount.innerHTML).toBe('count is: 0')
    expect(codeCount).not.toBeInTheDocument()

    await user.click(buttonCount)
    await user.click(buttonCount)

    expect(buttonCount.innerHTML).toBe('count is: 2')
    expect(screen.queryByText(/The count is now:/i)).toBeInTheDocument()
  })
})
