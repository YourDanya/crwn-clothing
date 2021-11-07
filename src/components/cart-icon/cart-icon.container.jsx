import React from 'react'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import {gql} from 'apollo-boost'

import CartIcon from './cart-icon.component'
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const TOGGLE_CART_HIDDEN=gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`

const GET_ITEM_COUNT=gql`
    {
        itemCount @client
    }
`

const CartIconContainer = ({data:{itemCount}, toggleCartHidden}) => {
    return <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount}/>
}

export default compose(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})
)(CartIconContainer)
