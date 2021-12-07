import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase/firebase.utils";
import { connect } from 'react-redux'

import './header.styles.scss'
import {ReactComponent as Logo } from '../../assets/crown.svg'

const Header = ({currentUser}) => {
    return(
        <div className = 'header'>
           <Link className = 'logo-container' to = '/'> 
           <Logo className = 'logo' />
           </Link>
           <div className = 'options'>
               <Link to ='/shop' className = 'option'>
               Shop
               </Link>
               <Link to ='/contact' className = 'option'>
               Contacts
               </Link>
               {currentUser ?
            //    (<Link to ='/signin' className = 'option'>
            //    Sign In
            //    </Link>)
               
               (<div className = 'option' onClick = {() =>  auth.signOut()}>
                Sign Out
               </div>)
               : 
               (<Link to ='/signin' className = 'option'>
               Sign In
               </Link>)
               }        
           </div>
        </div>
    )
}

const mapStateToPrpos = state => ({
     currentUser: state.user.currentUser 
})

export default connect(mapStateToPrpos)(Header) ;