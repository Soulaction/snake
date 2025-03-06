import { render, screen } from '@testing-library/react'

const appContent = 'Main Page'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<div>Main Page</div>)
  expect(screen.getByText(appContent)).toBeDefined()
})
