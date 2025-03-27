import { render, screen } from '@testing-library/react'
import { LoginPage } from '../pages/LoginPage'
// import { unmountComponentAtNode } from 'react-dom';

/* let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container as HTMLElement);
  (container as HTMLElement).remove()
  container = null;
}) */

describe('LoginPage', () => {
  it('render Login form', () => {
    render(<LoginPage />)

    expect(screen.getByRole('input')).toBe(2)
  })
})
