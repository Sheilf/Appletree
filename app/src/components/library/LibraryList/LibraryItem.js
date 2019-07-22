
import React, {Component} from 'react';
import './LibraryItem.css';
import '../../../styles/flex-border.css'
import {Link} from 'react-router-dom';

class LibraryItem extends Component {
  /*Props:
    route={doc.id}
    title ={doc.data().title}
    resource={doc.data().resource}
    course={doc.data().course}
    grades={doc.data().grades}
    subject={doc.data().subject} 
  */

  constructor(props){
    super(props);
    this.state={
      libraryItemColor: {},
      resourceColor: {}
    }
  }

  componentDidMount(){
    //Determine the resource property and define its border style to state
    if(this.props.resource === "Package")
      this.setState({
       libraryItemColor: {border: '2px solid #e6cc80'},
       resourceColor: {color: '#e6cc80'}
         
      })

    else if(this.props.resource === "Lesson Plan")
      this.setState({
        libraryItemColor: {border: '2px solid #ff8000'},
        resourceColor: {color: '#ff8000'}
          
       })
      
    else if(this.props.resource === "Project")
      this.setState({
        libraryItemColor: {border: '2px solid #a335ee'},
        resourceColor: {color: '#a335ee'}
          
       })

    else if(this.props.resource === "Worksheet")
      this.setState({
        libraryItemColor: {border: '2px solid #0070dd'},
        resourceColor: {color: '#0070dd'}
          
       })
    else if(this.props.resource === "Group Work")
      this.setState({
        libraryItemColor: {border: '2px solid #1eff00'},
        resourceColor: {color: '#1eff00'}
          
       })

    else if(this.props.resource === "Activities")
      this.setState({
        libraryItemColor: {border: '2px solid #FFFF29'},
        resourceColor: {color: '#FFFF29'}
          
       })
  }
  render(){
    //create cards background image style properties
    let backgroundIMG = {
      backgroundImage: 'url('+this.props.thumbnailURL+')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }

    return (
        <Link to={'/library/'+this.props.route}
          style={{...backgroundIMG, ...this.state.libraryItemColor}}
          className="LibraryItem flex-border-column-centered"> 
        
          <div id="card-text-container" className="search-cards flex-border-column">
            <h3 className="searchable">{this.props.title}</h3>
            <span id="bold-resource" style={this.state.resourceColor} className="searchable">{this.props.resource}</span>
            <span className="searchable">{this.props.course}</span>
            <span className="searchable">{this.props.subject}</span>
            <span className="searchable">{this.props.grades}</span>
          </div>
        </Link>

    );
  }
  
}

export default LibraryItem;

