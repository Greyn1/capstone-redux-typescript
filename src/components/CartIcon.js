import { useDispatch, useSelector } from 'react-redux';
import { CartIconContainer, ItemCount, ShoppingIcon } from '../Styles/CartIcon.styles.js';
import { selectCartCount, selectIsCartOpen } from '../Store/cart/cart.selector';
import { setIsCartOpen } from '../Store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount className='item-count'>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;