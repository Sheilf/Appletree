
import React, {Component} from 'react';
import './TextArea.css';

//import firebase


//import React Components




class TextArea extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <section>
        <label>{this.props.label} <br/>
        <textarea></textarea>
        </label>
      </section>
    );
  }
  
}

export default TextArea;

