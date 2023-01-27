import { render } from '@testing-library/react';

import CartDropDown from './cart-drop-down';

describe('CartDropDown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CartDropDown />);
    expect(baseElement).toBeTruthy();
  });
});
