import { render } from '@testing-library/react';
import App from './App';

it('Renders App without breaking', () => {
  render(<App />);
})

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
