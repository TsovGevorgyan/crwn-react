import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor(){
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',

        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword){
            alert("Passords don't match")
            return;
        }

        try{
            const { user } = auth.createUserWithEmailAndPassword(email, password);
            console.log('displayName',displayName)
            await createUserProfileDocument(user, {displayName})

            this.setState({
            displayName: 'eric',
            email: '',
            password: '',
            confirmPassword: '',
            })
        }
        catch(error){
           console.error(error)
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({[name]: value})
    }
    render(){
        const {displayName, email, password, confirmPassword } = this.state;
        return(
            <div className = 'sign-up'>
                <h1 className = 'title'>I don't have a account</h1>
                <span>Sign Up with your email and password</span>
                <FormInput 
                type = 'text'
                name = 'displayName'
                value = {displayName}
                onChange = {this.handleChange}
                label = 'Display Name'
                required
                />
                <FormInput 
                type = 'email'
                name = 'email'
                value = {email}
                onChange = {this.handleChange}
                label = 'Email'
                required
                />
                <FormInput 
                type = 'password'
                name = 'password'
                value = {password}
                onChange = {this.handleChange}
                label = 'Password'
                required
                />
                <FormInput 
                type = 'password'
                name = 'confirmPassword'
                value = {confirmPassword}
                onChange = {this.handleChange}
                label = 'Confirm Password'
                required
                />
                <CustomButton typye = 'submit' onClick = {this.handleSubmit}>Sign Up</CustomButton>
            </div>
        )
    }
}

export default SignUp;