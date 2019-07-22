
import React, {Component} from 'react';
import './SuccessMessage.css';

//import firebase
// import './firebase-config';
// import {database, storage, test_db} from './firebase-imports';

//import React Components




class SuccessMessage extends Component {

  constructor(){
    super();
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <section className="SuccessMessage" id={this.props.id}>
          {this.props.message}
      </section>
    );
  }
  
}

export default SuccessMessage;

