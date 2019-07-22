
import React, {Component} from 'react';
import './TextField.css';

//import firebase



//import React Components




class TextField extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <div class="form-group has-success">
        <label class="form-control-label" for="inputSuccess1">{this.props.label}</label>
        <input type="text" placeholder="Search keyword" class="form-control is-valid" id="inputValid" />
     
      </div>
    );
  }
  
}

export default TextField;

