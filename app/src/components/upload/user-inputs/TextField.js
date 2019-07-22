
import React from 'react';
import './TextField.css';

//A simple TextField from Bootstrap
const TextField = ({label, placeholder, id}) => {
//PROPS: label, placeholder, id
    return (
      <div class="form-group has-success">
        <label class="form-control-label" for="inputSuccess1">{label}</label>
        <input type="text" placeholder={placeholder} class="form-control is-valid" id={id} />
      </div>
    );
  
}

export default TextField;

