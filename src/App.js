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

class App extends React.Component {

    // constructor(props){
    //     super(props)
    //     this.state={
    //         currentUser: null
    //     }
    // }

    unsubscribeFromAuth=null

    componentDidMount() {
        const {setCurrentUser}= this.props;

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

const mapStateToProps= ({user})=>({
    currentUser: user.currentUser
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
