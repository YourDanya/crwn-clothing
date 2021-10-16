import React from 'react'
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selector'
import {createStructuredSelector} from 'reselect'
import CheckoutPage from "./pages/checkout/checkout.component";
import styled from 'styled-components'


// const Text= styled.div`
//     color:red;
//     font-size: 28px;
//     border: ${({isActive})=> isActive ? '1px solid black' : '3px dotted green'}
// `

class App extends React.Component {

    unsubscribeFromAuth=null

    componentDidMount() {
        const {setCurrentUser, collectionsArray}= this.props;

        console.log(collectionsArray)

        this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
            if(userAuth) {
                const userRef= await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                })
            }
            else{
                setCurrentUser(userAuth)
            }

            // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
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

const mapDispatchToProps=dispatch=>({
    setCurrentUser: user=> dispatch(setCurrentUser(user))
})

const mapStateToProps= createStructuredSelector({
    currentUser: selectCurrentUser
    // collectionsArray: selectCollectionsForPreview
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
