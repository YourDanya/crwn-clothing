import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {ReactComponent as Logo} from '../../assets/crown.svg'

import {auth} from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCurrentUser} from "../../redux/user/user.selector";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {signOutStart} from "../../redux/user/user.actions";

import {HeaderContainer, LogoContainer, OptionLink, OptionsContainer} from './header.styles'

const Header= ({currentUser, hidden, signOutStart, test})=> {
    return <HeaderContainer>

        <LogoContainer to={'/'}>
            <Logo className={'logo'}/>
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to={'/shop'}>SHOP</OptionLink>
            <OptionLink to={'contact'}>{'CONTACT'}</OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={() => signOutStart()} >SIGN OUT</OptionLink>
                    :
                    <OptionLink to={'signin'}>SIGN IN</OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown/>
        }

    </HeaderContainer>
}

const mapStateToProps= (state)=>({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state),
})

const mapDispatchToProps = dispatch =>({
    signOutStart: ()=> dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)