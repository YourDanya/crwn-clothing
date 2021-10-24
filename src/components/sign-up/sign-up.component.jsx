import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import './sign-up.styles.scss'
import {signUpStart} from "../../redux/user/user.actions";
import {connect} from 'react-redux'

class SignUp extends React.Component{

    constructor() {
        super();

        this.state= {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

    }

    handleSubmit = async event =>{
        event.preventDefault()

        const {displayName, email, password, confirmPassword}= this.state
        const {signUpStart}= this.props
        if(password !== confirmPassword){
            alert('passwords don`t match')
            return
        }

        signUpStart({displayName, email, password})

    }

    handleChange = event =>{
        const {name, value}=event.target
        this.setState({[name] : value})
    }

    render(){

        const {displayName, email, password, confirmPassword}= this.state;

        const signUpStart =this.props

        return <div className={'sign-up'}>
            <h2 className={'title'}>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className={'sign-up-form'} onSubmit={this.handleSubmit}>

                <FormInput
                    type={'text'}
                    name={'displayName'}
                    value={displayName}
                    onChange={this.handleChange}
                    label={'Display Name'}
                />

                <FormInput
                    type={'email'}
                    name={'email'}
                    value={email}
                    onChange={this.handleChange}
                    label={'Email'}
                />

                <FormInput
                    type={'password'}
                    name={'password'}
                    value={password}
                    onChange={this.handleChange}
                    label={'Password'}
                />

                <FormInput
                    type={'password'}
                    name={'confirmPassword'}
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label={'Confirm Password'}
                />

                <CustomButton type={'submit'}>SIGN UP</CustomButton>

            </form>
        </div>
    }

}

const mapDispatchToProps= dispatch =>({
    signUpStart: user=> dispatch(signUpStart(user))
})

export default connect(null, mapDispatchToProps)(SignUp)




