
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './BigButton.css';
import '../../../styles/flex-border.css'

//import firebase
// import './firebase-config';
// import {database, storage, test_db} from './firebase-imports';

//import React Components




class BigButton extends Component {

  constructor(){
    super();
    this.state={
      
    }
  } 

  componentDidMount(){

  }
  render(){
    let items = this.props.buttons.map((button
    )=>(
        <Link to={button.route}><button>{button.label}</button></Link>
    ))
    return (
      <section className="BigButton flex-border-row-wrap">
        
        <div className="flex-border-row">
          {items}
        </div>
      </section>
    );
  }
  
}

export default BigButton;

