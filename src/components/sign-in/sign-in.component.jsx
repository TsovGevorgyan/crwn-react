import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: ''})
        }
        catch(error){
            console.error(error.message)
        }
        this.setState({email: '', password: ''})

    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({ [name]: value })
    }
    render(){
        return(
           <div className = 'sign-in'>
               <h1>I already have an account</h1>
               <span>Sign in with your email and password</span>

               <form onSubmit = {this.handleSubmit}>
                   <FormInput type = 'email' 
                   name = 'email' 
                   value = {this.state.email} 
                   handleChange = {this.handleChange}
                   label = 'email'
                   required />
                   {/* <label>Email</label> */}
                   <FormInput type = 'password' 
                   name = 'password' 
                   value = {this.state.password} 
                   handleChange = {this.handleChange}
                   label = 'password'
                   required />
                   <div className = 'buttons'>
                    <CustomButton type = 'submit'>
                        Sign In
                    </CustomButton>
                    <CustomButton isGoogleSignIn onClick = {signInWithGoogle}>
                        Sign In With Google
                    </CustomButton>
                   </div>
               </form>
           </div>
        )
    }
}

export default SignIn;