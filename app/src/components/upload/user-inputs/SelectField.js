
import React from 'react';
import './SelectField.css';

//Select field will map option choice props to cells.
const SelectField = ({options, id, label}) => {
  //PROPS: options, id, label

  let option_set = options.map((option) =>(
    <option>{option}</option>
  ))

  return (
    <div class="form-group">
      <label for={id}>{label}</label>
      <select class="form-control" id={id}>
        {option_set}
      </select>
    </div>

  );
   
}

export default SelectField;

