
import React, {Component} from 'react';
import './FormFailureMessage.css';




class FormFailureMessage extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <section className="FormFailureMessage">
        {this.props.msg}
      </section>
    );
  }
  
}

export default FormFailureMessage;

