
import React, {Component} from 'react';
import './Dashboard.css';
import '../../styles/flex-border.css'
import '../../firebase-config';
import {upload_db, star_db} from '../../firebase-imports';
import LibraryItem from '../library/LibraryList/LibraryItem';
import * as firebase from 'firebase';


class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state={
      items:"",
      star_cache: [],
      toggle: false,
      header: "Uploads"
    }
    this.queryStars = this.queryStars.bind(this);
    this.queryUploads = this.queryUploads.bind(this);
    this.renderUploads = this.renderUploads.bind(this);
    this.renderStars = this.renderStars.bind(this);
    
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user)
        this.queryUploads(user);
    })
  }
  renderUploads(events){
    firebase.auth().onAuthStateChanged(user=>{
      this.queryUploads(user);
    })
  }

  renderStars(event){
    firebase.auth().onAuthStateChanged(user=>{
      this.queryStars(user);
    })
  }

  queryUploads(user){
    let query = upload_db.where("uid", "==", user.uid)      
    query.get().then(querySnapShot =>{
      let items = querySnapShot.docs.map((doc)=>(
        <LibraryItem 
          title ={doc.data().title} 
          route={doc.id}
          resource={doc.data().resource}
          course={doc.data().course}
          grades={doc.data().grades}
          subject={doc.data().subject}
          thumbnailURL = {doc.data().thumbnailURL}
        />
      ))

      this.setState({
      items: items,
      header: "Uploads"}) 
    })
  }
  queryStars(user){
    star_db.where("liked_by", "==", user.uid).get().then(querySnapShot=>{
      let result = querySnapShot.docs.map((doc) =>(
        doc.data().document
      ))
      
      return result;
    }).then(result=>{
      let items = result.map((item)=>(
        upload_db.doc(item).get().then(inner =>{
          return(
            <LibraryItem
              title={inner.data().title}
              resource={inner.data().resource}
              course={inner.data().course}
              grades={inner.data().grades}
              subject={inner.data().subject}
              thumbnailURL = {inner.data().thumbnailURL} 
            />
          )
        })
      ))

      return Promise.all(items)
    }).then(answer=>{
      this.setState({
        items: answer,
        header: "Starred"
      })
    })

  }
  render(){
    return (
      <section className="Dashboard flex-border-row-wrap">
        <div id="dashboard-buttons" className="flex-border-column-centered">
          <div className="btn-temp-container flex-border-column-centered">
            <button onClick={this.renderUploads}>My Uploads</button>          
            <button onClick={this.renderStars}>Starred</button>
          </div>
        </div>
        <div id="dashboard-display" className="flex-border-column-centered">
          <h2>{this.state.header}</h2>
          <div className="card-container flex-border-row-centered-wrap">
            {this.state.items}
          </div>
        </div>
      </section>
    );
  }
  
}

export default Dashboard;

