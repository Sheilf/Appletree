
import React, {Component} from 'react';
import './SelectField.css';
import '../../../styles/flex-border.css';

//import firebase


//import React Components




class SelectField extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    let items = this.props.resources.map((resource) =>(
      <option>{resource}</option>
    ))
    return (
    <div class="SelectField form-group">
      <div className="temp-container">
      <label for="exampleSelect1">{this.props.label}</label>
      <select class="form-control" id="select-input-container" id={this.props.id}>
        {items}
      </select>
      </div>
    </div>
    );
  }
  
}

export default SelectField;

