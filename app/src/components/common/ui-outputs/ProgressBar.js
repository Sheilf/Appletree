
import React, {Component} from 'react';
import './ProgressBar.css';
import '../../../styles/bootstrap.css'

//import firebase
// import './firebase-config';
// import {database, storage, test_db} from './firebase-imports';

//import React Components




class ProgressBar extends Component {

  constructor(){
    super();
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
        <div class="ProgressBar">
            <progress id={this.props.for} class="progress-bar" role="progressbar" value="0" max="100">
            </progress>
        </div>


    );
  }
  
}

export default ProgressBar;

