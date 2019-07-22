
import React, {Component} from 'react';
import './DocumentDownload.css';
import '../../styles/flex-border.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faDownload } from '@fortawesome/free-solid-svg-icons';
import * as firebase from 'firebase';
import '../../firebase-config';
import {upload_db, star_db} from '../../firebase-imports';
import LibraryItem from '../library/LibraryList/LibraryItem';
import {Link} from 'react-router-dom';



class DocumentDownload extends Component {

  constructor(){
    super();
    this.state={
      title: "",
      course: "",
      subject: "",
      grades: "",
      resource: "",
      description: "",
      thumbnail: "",
      downloadURL: "",
      starred: false,
      posted_by: "",
      posters_profile_link: "https://res.cloudinary.com/eduprojectsil/image/upload/e_shadow:40/v1531605362/appletree_mdbesb.png",
      posters_name: ""
      
    }
    this.saveStarToDb = this.saveStarToDb.bind(this);
  }

  componentDidMount(){
    //get the data from the DB and figure out if the user has previously liked the document.

    //The route is generated from the database
    //grab the route ID and retrieve the data from the daabase
    //set the database content to state
    upload_db.doc(this.props.match.params.document).get().then(doc =>{
      this.setState({
        title: doc.data().title,
        course: doc.data().course,
        subject: doc.data().subject,
        grades: doc.data().grades,
        resource: doc.data().resource,
        description: doc.data().description,
        thumbnail: doc.data().thumbnailURL,
        downloadURL: doc.data().downloadURL,
        posted_by: doc.data().uid,
        posters_profile_photo: doc.data().uid_photo,
        posters_name: doc.data().uid_name
   
      })
    })

    //if user is logged in: get the document where the RouteID and uid match.
    //if it matches, highlight the star on load.
    //otherwise leave it gray.
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        star_db
        .where('document', '==', this.props.match.params.document)
        .where('liked_by', '==', user.uid)
        .get().then(querySnapshot =>{
          if(querySnapshot.docs.length == 1)
            document.getElementById("star-icon").querySelector("path").setAttribute("fill", "gold")
        })
      }
    })
  }

  saveStarToDb(event){
    //on star click
    //if user is logged in: allow to star
    //if star is in db, skip
    event.persist();
    firebase.auth().onAuthStateChanged(user =>{
      if(user){        
        star_db
        .where('document', '==', this.props.match.params.document)
        .where('liked_by', '==', user.uid)
        .get().then(querySnapshot=>{
          if(querySnapshot.docs.length == 0){
            //insert to db
            //get users UID
            upload_db.doc(this.props.match.params.document).get().then(doc =>{
              return doc.data().uid
            }).then(poster_uid =>{
              //add relative to star DB
              star_db.add({
                liked_by: user.uid,
                document: this.props.match.params.document,
                posted_by: poster_uid
              })
            })
            //make the star gold
            event.target.setAttribute("fill", "gold")
          }else{
            //The star has been liked and the user wants to unlike it.
            querySnapshot.forEach(doc=>{
              doc.ref.delete();
            })
    
            event.target.setAttribute("fill", "grey")
          }
        })
      }})

    //toggle a render
    this.setState({
      starred: !this.state.starred

    })
  }

  render(){
    if(this.state.thumbnail === ""){
      this.setState({
        thumbnail: "https://res.cloudinary.com/eduprojectsil/image/upload/v1533687594/skyimg_ykozcc.png"
      })
    }

  
    return (
      // describes the document
      <section className="DocumentDownload flex-border-row">
        <div className="document-data flex-border-column-centered">
          <div id="document-content" className="flex-border-column-centered">

           
            <Link to={"/profile/"+this.state.posted_by}><img id="posters_photo" src={this.state.posters_profile_photo}/></Link>
            {this.state.posters_name}
            <br/>
            <h1>{this.state.title}</h1>
            <h3>{this.state.course}</h3>
            <h4> {this.state.subject} </h4>
            <h4>{"Grades "+this.state.grades}</h4>
            <h5>{this.state.resource}</h5>
            <p>{this.state.description}</p>
          </div>
        </div>

        
        {/* Presents Route/Card */}
        <div className="img-container flex-border-column-centered">
          <div className="document-actions flex-border-row-centered"> 
            <a className="doc-action flex-border-column-centered"
              download={this.state.downloadURL} 
              href={this.state.downloadURL}> 
            
              <FontAwesomeIcon icon={faDownload} className="fa-2x" />
            </a>
            <label onClick={this.saveStarToDb} id="star-save" className="Star doc-action flex-border-row-centered">
              <FontAwesomeIcon icon={faStar} className="fa-2x" id="star-icon" /> 
            </label>
          </div>

          <LibraryItem 
            title ={this.state.title} 
            route={this.props.match.params.document}
            resource= ""
            course= ""
            grades=""
            subject=""
            thumbnailURL = {this.state.thumbnail}
          />
        </div>
      </section>
    );
  }
  
}

export default DocumentDownload;

