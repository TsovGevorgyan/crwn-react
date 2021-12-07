import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from 'react-redux'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from "./pages/homepage/shop.component";
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from "./redux/user/user.actions";
import './App.css';

class App extends React.Component {
  // constructor(){
  //   super();

  //   this.state = {
  //      currentUser: null      
  //   }
  // }
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async ( userAuth, additionalData) => {
      //this.setState({currentUser: userAuth})
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth, additionalData)
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
    this.unsubscribeFromAuth();
  }
  render(){
  return (
    <div className="App">
      <Header />
      <Routes>
         <Route exact path = '/' element={<HomePage/>}/>
         <Route path = '/shop' element={<ShopPage/>}/>
         <Route exact path = '/signin' render = {() => this.props.currentUser ? ( <Navigate to = '/' />) : ( <SignInAndSignUp/>)  } />
      </Routes>

    </div>
  );
  }
}
const mapStateToProps = user => ({
      currentUser: user.currentUser
})
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
