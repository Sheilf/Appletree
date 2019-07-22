import React, {Component} from 'react';
import './Nav.css';
import '../../styles/bootstrap.css';
import '../../styles/flex-border.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faCloud, faPaperPlane, faUserCircle, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import '../../firebase-config';
import * as firebase from 'firebase';
import {Link} from 'react-router-dom';

//Renders and control a Bootstrap navigation template.
class Nav extends Component {
  constructor(props){
    super(props);
    this.state={
      loginState: false,
      buttonAction: "Log in",
      dashboard: ""
    }
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount(){
    //establish a listener to determine whether user is logged in or not
    //the state will determine the navbar's options.
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.setState({
          loginState: true,
          buttonAction: "Sign out",
          dashboard: "Dashboard"
        })    
      }else{
        this.setState({
          loginState: false,
          buttonAction: "Log in",
        })
      }
    })  
  }

  signOut(){
    //Sign the user out. triggers the onAuthStateChanged() listener!
    firebase.auth().signOut();
    this.setState({
      loginState:false,
      buttonAction: "Log in"
    })
  }
  
  render(){
    //generate list items that will always be present
    let list_items = this.props.links.map((item) => (
      <li class="nav-item">
        <Link to={item.route} class="nav-link">
          <FontAwesomeIcon icon={Object.values(item.icon)[0]}/> 
          {item.label}
        </Link>
      </li>

    ))
    return (
      <nav class="Nav navbar navbar-expand-lg navbar-light bg-light flex-border-row">
        {/* Logo link to home */}
        <Link to="/" class="navbar-brand">
          <img id="logo-img" 
            src="https://res.cloudinary.com/eduprojectsil/image/upload/e_shadow:40/v1531605362/appletree_mdbesb.png"
          />
        </Link>

        {/* Mobile Hamburger Button on media query2 */}
        <button id="mobile-nav-button" 
          class="navbar-toggler" 
          type="button"
          data-toggle="collapse" 
          data-target="#navbarColor03" 
          aria-controls="navbarColor03" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        {/*List of navigation options*/}
        <div class="collapse navbar-collapse" id="navbarColor03">
          <ul class="navbar-nav mr-auto">
            {/* List of items always preset */}
            {list_items}

            {/* nav links that are conditional on user login state */}
            <li className="nav-item" id="user-login-nav" className="flex-border-row">
            { 
              this.state.buttonAction === "Sign out" ?  
                <Link class="nav-link" to="/dashboard"><FontAwesomeIcon icon={faUserCircle} />Dashboard</Link> 
                : 
                null
            }

            <Link class="nav-link" to="/login">
              <div onClick={this.signOut}>
                <FontAwesomeIcon icon={faSignOutAlt} /> 
                {this.state.buttonAction}
              </div>
            </Link>
      
            </li>
          </ul>
        </div>

      </nav>
    );
  }
  
}

export default Nav;
