import { render } from '@testing-library/react';

import CartIconComponent from './cart-icon';

describe('CartIconComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartIconComponent />);
    expect(baseElement).toBeTruthy();
  });
});
