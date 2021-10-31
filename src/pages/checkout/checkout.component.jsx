import React, {useContext} from "react"
import {connect}  from 'react-redux'
import {createStructuredSelector} from "reselect";
import './checkout.styles.scss'
import {selectCartTotal} from '../../redux/cart/cart.selectors'
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import {CartContext} from "../../providers/cart/cart.provider";

const CheckoutPage= () => {

    const {cartItems, total} = useContext(CartContext)

    return (<div className={'checkout-page'}>
        <div className={'checkout-header'}>
            <div className={'header-block'}>
                <span>Product</span>
            </div>
            <div className={'header-block'}>
                <span>Description</span>
            </div>
            <div className={'header-block'}>
                <span>Quantity</span>
            </div>
            <div className={'header-block'}>
                <span>Price</span>
            </div>
            <div className={'header-block'}>
                <span>Remove</span>
            </div>
        </div>

        {cartItems.map(cartItem =>(
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}

        <div className={'total'}>
            <span>TOTAL:${total}</span>
        </div>

        <div className={'test-warning'}>
            *Please use the following test credit card for payment
            <br/>
            4242 4242 4242 4242 - Expiring: 01-29 -CVV: 123
        </div>

        <StripeCheckoutButton price={total}/>

    </div>
)}

export default CheckoutPage