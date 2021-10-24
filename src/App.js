import './App.css';

import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'
import {connect} from 'react-redux'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import styled from 'styled-components'

import {selectCurrentUser} from './redux/user/user.selector'
import {checkUserSession} from "./redux/user/user.actions";

// const Text= styled.div`
//     color:red;
//     font-size: 28px;
//     border: ${({isActive})=> isActive ? '1px solid black' : '3px dotted green'}
// `

class App extends React.Component {

    unsubscribeFromAuth=null

    componentDidMount() {
        const {checkUserSession} = this.props
        checkUserSession()
    }

    componentWillUnmount() {
    }

    render(){
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path={'/shop'} component={ShopPage}/>
                    <Route exact path={'/checkout'} component={CheckoutPage}/>
                    <Route exact path={'/signIn'} render={()=>
                        this.props.currentUser? (
                            <Redirect to={'/'}/>
                            ): (<SignInAndSignUpPage/>) }/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser
    // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
