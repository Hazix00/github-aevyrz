import styles from './cart-icon.module.scss';
import { ReactComponent as ShoppingIcon } from '../../../../assets/shopping-bag.svg';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCartHidden } from '../../../store/slices/user/cart/cart.slice';

/* eslint-disable-next-line */
export interface CartIconProps {}

export const CartIcon: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles['cart-icon']} onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className={styles['shopping-icon']} />
      <span className={styles['item-count']}>{ 0 }</span>
    </div>
  );
}

export default CartIcon;
