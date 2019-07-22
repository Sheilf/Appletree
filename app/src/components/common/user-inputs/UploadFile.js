
import React, {Component} from 'react';
import './UploadFile.css';
import '../../../styles/flex-border.css';

//import firebase
// import './firebase-config';
// import {database, storage, test_db} from './firebase-imports';

//import React Components




class UploadFile extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <section className="UploadFile flex-border-column-centered">
          <label for={this.props.label} className="flex-border-column-centered">{this.props.label} <br/>
            <input id={this.props.label} type="file"/>
          </label>
      </section>
    );
  }
  
}

export default UploadFile;

