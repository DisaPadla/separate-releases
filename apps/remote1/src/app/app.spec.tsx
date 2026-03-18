import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter initialEntries={['/remote1']}>
        <App />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should display the remote1 navigation label', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/remote1']}>
        <App />
      </MemoryRouter>
    );
    expect(getByText(/Remote App 1/i)).toBeTruthy();
  });
});
