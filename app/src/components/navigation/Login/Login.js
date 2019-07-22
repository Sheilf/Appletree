
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Login.css';
import '../../../styles/flex-border.css'
import * as firebase from "firebase";
import '../../../firebase-config';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

//This component is a 3rd Party component maintained by react-firebaseUI to handle Authentication
class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      isSignedIn: false
    }

    this.uiConfig= {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render(){

    return(
    <section className="Login flex-border-column-centered">
      {
        this.state.isSignedIn ? <Redirect to="/"/>
        : 
        (
          <div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )
      }
    </section>
    )
  }
}

export default Login;
