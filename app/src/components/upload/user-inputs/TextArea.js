
import React from 'react';
import './TextArea.css';

const TextArea = ({id, label}) =>{
  //PROPS: id,label
  return (
    <div class="form-group">
    <label for={id}>{label}</label>
    <textarea class="form-control" id={id} rows="3"></textarea>
   </div>
  );
}

export default TextArea;

