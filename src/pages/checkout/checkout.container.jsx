import React from 'react'
import {graphql, Query} from 'react-apollo'
import CheckoutPage from "./checkout.component";
import {flowRight as compose} from 'lodash'
import {gql} from "apollo-boost";

const GET_CART_ITEMS= gql`
    {
        cartItems @client
    }
`
const GET_ITEM_COUNT=gql`
    {
        itemCount @client
    }
`
const GET_TOTAL=gql`
    {
        total @client
    }
`
const GET_CART_HIDDEN= gql`
    {
        cartHidden @client  
    }
`
const CheckoutContainer =({getCartItems:{cartItems}, getTotal:{total}}) =>{
    console.log(cartItems)
    console.log(total)
    return <CheckoutPage cartItems={cartItems} total={total}/>
}

export default compose(
    graphql(GET_CART_ITEMS, {name: 'getCartItems'}),
    graphql(GET_TOTAL, {name: 'getTotal'}),
)(CheckoutContainer)
