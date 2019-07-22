
import React, {Component} from 'react';
import './Contact.css';
import '../../styles/flex-border.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';


class Contact extends Component {

  constructor(){
    super();
    this.state={
      
    }
    this.navToCodemoji = this.navToCodemoji.bind(this);
  }

  componentDidMount(){

  }
  navToCodemoji(event){
    window.location.href="https://www.codemoji.com"
  }
  render(){
    return (
      <section className="Contact flex-border-column-centered">
        <div className="img-temp-container"></div>
        
        <a className="flex-border-column-centered" onClick={this.navToCodemoji} target="_blank">
          Visit Codemoji 
          <FontAwesomeIcon icon={faSignOutAlt} />
        </a>
        
        <p>
          Teach kids how to code using image-based learning
          <br/> 
          with emojis and fun, interactive, online lessons.
          <br/>
          <br/>
          Contact Livio Bolzon: livio@codemoji.com.
          <br/>
        </p>
      </section>
    );
  }
  
}

export default Contact;

