import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the title and switches theme', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'StressFreeBudget' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('radio', { name: 'Dark' }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    await userEvent.click(screen.getByRole('radio', { name: 'Light' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('shows the backend as not configured when no env is set', async () => {
    render(<App />)
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Backend not configured yet'))
  })
})
