import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, expect, it } from 'vitest'
import App from './App.tsx'
import { GamesProvider } from './games/GamesContext.tsx'

beforeEach(() => localStorage.clear())

it('add, change status on detail, filter, remove', async () => {
  const user = userEvent.setup()
  render(
    <GamesProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </GamesProvider>,
  )

  await user.type(screen.getByLabelText('Title'), 'Zelda')
  await user.type(screen.getByLabelText('Platform'), 'Switch')
  await user.click(screen.getByRole('button', { name: 'Add game' }))

  await user.click(screen.getByRole('link', { name: 'Zelda' }))
  await user.selectOptions(screen.getByRole('combobox', { name: 'Status' }), 'done')
  await user.click(screen.getByRole('link', { name: 'Back' }))
  expect(screen.getByRole('listitem').textContent).toContain('done')

  const filter = screen.getByRole('combobox', { name: 'Status filter' })
  await user.selectOptions(filter, 'backlog')
  expect(screen.queryByRole('link', { name: 'Zelda' })).toBeNull()

  await user.selectOptions(filter, 'All')
  expect(screen.queryByRole('link', { name: 'Zelda' })).not.toBeNull()

  await user.click(screen.getByRole('button', { name: 'Remove Zelda' }))
  expect(screen.queryByRole('link', { name: 'Zelda' })).toBeNull()
})
