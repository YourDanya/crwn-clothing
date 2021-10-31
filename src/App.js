import React from 'react'
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from "./pages/shop/shop.component";
import Header from './components/header/header.component'
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import CheckoutPage from "./pages/checkout/checkout.component";
import CurrentUserContext from "./context/current-user/currenr-user.context";

class App extends React.Component {

    unsubscribeFromAuth=null

    constructor(){
        super()
        this.state= {
            currentUser:null
        }
    }

    componentDidMount() {
        const {setCurrentUser}= this.props;

        this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
            if(userAuth) {
                const userRef= await createUserProfileDocument(userAuth)

                userRef.onSnapshot(snapshot => {
                    this.setState({currentUser:{
                        id: snapshot.id,
                        ...snapshot.data()
                    }})
                })
            }
            else{
                this.setState({currentUser: userAuth})
            }

        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render(){
        return (
            <div>
                <CurrentUserContext.Provider value={this.state.currentUser}>
                    <Header/>
                </CurrentUserContext.Provider>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route path={'/shop'} component={ShopPage}/>
                    <Route exact path={'/checkout'} component={CheckoutPage}/>
                    <Route exact path={'/signIn'} render={()=>
                        this.state.currentUser? (
                            <Redirect to={'/'}/>
                            ): (<SignInAndSignUpPage/>) }/>
                </Switch>
            </div>
        )
    }
}


export default App;
