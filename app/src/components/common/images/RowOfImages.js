
import React, {Component} from 'react';
import './RowOfImages.css';
import '../../../styles/flex-border.css'

//import firebase
// import './firebase-config';
// import {database, storage, test_db} from './firebase-imports';

//import React Components




class RowOfImages extends Component {

  constructor(){
    super();
    this.state={
      
    }
  }

  componentDidMount(){

  }
  render(){
    let items = this.props.images.map((image, index)=>(
        <div id="image-container">
            <p>
                {index+1+". " + this.props.captions[index]}
            </p>
            <img src={image} />

        </div>
    ))
    return (
      <section className="RowOfImages flex-border-row-centered-wrap">
        <h2>How Appletree Works</h2>
        <figure className="flex-border-row-centered-wrap"> 
            {items}
        </figure>
      </section>
    );
  }
  
}

export default RowOfImages;

