import React from 'react'
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton= ({price}) =>{
    const priceForStripe= price*100;
    const publishableKey= 'pk_test_51JixZlIR63LtJqqR9UtiQw2hqoQGouo54fUynonqrPzR3VjCkAVB46eNcfq9xSsbJuTydrmt5MBxJiEVdcRGU9Dh00ihwFggEw';

    const onToken=token =>{
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label={'Pay Now'}
            name={'CRWN CLOTHING Ltd.'}
            billingAddress
            shippingAddress
            image={'https://svgshare.com/i/CUz.svg'}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel={'Pay Now'}
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton