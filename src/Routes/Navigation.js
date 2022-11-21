import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../Utils/Firebase";
import CartDropdown from "../components/CartDropdown";
import { selectCurUser } from "../Store/user/user.selector";
import { selectIsCartOpen } from "../Store/cart/cart.selector";
import CartIcon from "../components/CartIcon";
import { ReactComponent as CrwnLogo } from '../Assets/crown.svg';
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "../Styles/Navigation.styles";

function Navigation() {
    
    const curUser = useSelector(selectCurUser);
    const isCartOpen = useSelector(selectIsCartOpen)

    return (
        <>
            <NavigationContainer>
                <LogoContainer as={Link} to='/' > 
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop' as={Link}>SHOP</NavLink>
                    {
                        curUser ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
                            :
                            (<NavLink as={Link} to='/auth'>SIGN IN</NavLink>)
                    }
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
}

export default Navigation;
