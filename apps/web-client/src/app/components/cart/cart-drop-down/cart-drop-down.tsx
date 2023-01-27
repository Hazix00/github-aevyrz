import { FC, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { hideCart } from '../../../store/slices/user/cart/cart.slice';
import CustomButton from '../../custom-button/custom-button.component';
import styles from './cart-drop-down.module.scss';

/* eslint-disable-next-line */
export interface CartDropDownProps {}

export const CartDropDown: FC = () => {

  const cartRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        dispatch(hideCart());
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef, dispatch]);

  return (
    <div ref={cartRef} className={styles['cart-dropdown']}>
      <div className={styles['cart-items']}>
        
      </div>
      <CustomButton >GO TO CHECKOUT</CustomButton>
    </div>
  );
}

