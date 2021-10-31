import React, {useContext} from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss'
import {connect} from 'react-redux'
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";
import {createStructuredSelector} from "reselect";
import {CartContext} from "../../providers/cart/cart.provider";

const CartIcon= ({itemCount}) => {
    const {toggleHidden, cartItemsCount} = useContext(CartContext)

    return(
    <div className={'cart-icon'} onClick={toggleHidden}>
        <ShoppingIcon className={'shopping-icon'}/>
        <span className={'item-count'}>{cartItemsCount}</span>
    </div>)
}

export default CartIcon