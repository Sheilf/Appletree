
import React, {Component} from 'react';
import './RadioForm.css';
import '../../../styles/flex-border.css';
import RadioButton from './RadioButton'

//import firebase



//import React Components




class RadioForm extends Component {

  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <form id="form-container" class="RadioForm-Container">
      <label>{this.props.label}</label>
      <div class="RadioForm flex-border-row-centered">
     
      <div>
      <div class="custom-control custom-radio">
      
        <input type="radio" id={this.props.radioID[0]} name="customRadio" class="custom-control-input"/>
        <label class="custom-control-label" for={this.props.radioID[0]}>K-2</label>
      </div>
      <div class="custom-control custom-radio">
        <input type="radio" id={this.props.radioID[1]} name="customRadio" class="custom-control-input"/>
        <label class="custom-control-label" for={this.props.radioID[1]}>3-5</label>
      </div>
      </div>

      <div>
      <div class="custom-control custom-radio">
        <input type="radio" id={this.props.radioID[2]} name="customRadio" class="custom-control-input" />
        <label class="custom-control-label" for={this.props.radioID[2]}>6-8</label>
      </div>
      <div class="custom-control custom-radio">
        <input type="radio" id={this.props.radioID[3]} name="customRadio" class="custom-control-input" />
        <label class="custom-control-label" for={this.props.radioID[3]}>9-12</label>
      </div>
    </div>
    </div>
    </form>
    );
  }
  
}

export default RadioForm;

