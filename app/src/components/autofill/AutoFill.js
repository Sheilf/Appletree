
import React, {Component} from 'react';
import './AutoFill.css';

import '../../styles/flex-border.css';
import * as firebase from 'firebase';
import '../../firebase-config';

import TextField from '../upload/user-inputs/TextField'

import TextArea from '../upload/user-inputs/TextArea';
import SelectField from '../upload/user-inputs/SelectField'
import {autofill_db} from '../../firebase-imports';

class AutoFill extends Component {

  constructor(props){
    super(props);
    this.state={
      toggle: false
      
    }

    this.saveAutoFill = this.saveAutoFill.bind(this);
    this.exitAutoFill = this.exitAutoFill.bind(this);
  }

  componentDidMount(){

  }

  exitAutoFill(event){
    this.setState({toggle: !this.state.toggle});
    document.getElementById('autofill-container').style.opacity = 0;
    document.getElementById('autofill-container').style.visibility = 'hidden';

    
  }
  saveAutoFill(event){
    let autofill_id_set = ["autofill-course","autofill-subject","autofill-grades","autofill-resource", "autofill-description"];
    let autofill_map = new Map();

    autofill_id_set.forEach(element => {
      autofill_map.set(element, document.getElementById(element).value);
    })

   
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
          autofill_db.doc(user.uid).set({
 
            course: autofill_map.get("autofill-course"),
            subject: autofill_map.get("autofill-subject"),
            grades: autofill_map.get("autofill-grades"),
            resource: autofill_map.get("autofill-resource"),
            description: autofill_map.get("autofill-description"),
            uid: user.uid
          })
        }else{
            alert("you need to log in!")
        }
    })

    this.setState({
      toggle: !this.state.toggle
    })

    document.getElementById('autofill-container').style.opacity = 0;
    document.getElementById('autofill-container').style.visibility = 'hidden';

  }
  render(){
    return (
      <section id="autofill-container" className="AutoFill flex-border-column-centered">
        <p id="exit-autofill" onClick={this.exitAutoFill}>X</p>
        <h4>Set your data here once and we'll remember it the next time you come back.</h4> 

      

          <TextField label="Course Category" id="autofill-course" placeholder="Mathematics"/>
          <TextField label="Subject" id="autofill-subject" placeholder="Geometry"/>
          <SelectField label="Grade Levels" id="autofill-grades" options={["K-2", "3-5","6-8","9-12"]} />
          <SelectField label="Resource type" id="autofill-resource" options={["Package", "Lesson Plan", "Project", "Worksheet", "Group Work","Activities"]} />
          <TextArea label="Short Description" id="autofill-description"/>
          <button onClick={this.saveAutoFill}>Save AutoFill</button>
       
      </section>
    );
  }
  
}

export default AutoFill;

