
import React, {Component} from 'react';
import './Upload.css';
import '../../styles/flex-border.css';
import * as firebase from 'firebase';
import '../../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faImage, faRedoAlt, faRecycle } from '@fortawesome/free-solid-svg-icons';
import TextField from './user-inputs/TextField';
import SelectField from './user-inputs/SelectField';
import TextArea from './user-inputs/TextArea';
import ProgressBar from '../common/ui-outputs/ProgressBar';
import SuccessMessage from '../common/ui-outputs/SuccessMessage';
import FormFailureMessage from '../common/ui-outputs/FormFailureMesage';
import AutoFill from '../autofill/AutoFill';

import {upload_db, autofill_db} from '../../firebase-imports';


let auth = firebase.auth();

class Upload extends Component {

  constructor(){
    super();
    this.state={
      thumbnailURL: "https://res.cloudinary.com/eduprojectsil/image/upload/e_shadow:40/v1531605362/appletree_mdbesb.png",
      thumbnail_uploaded: false,
      document_uploaded: false,
      completion_error: false,
      toggle: false
    }
    this.uploadDocToDB = this.uploadDocToDB.bind(this);
    this.resetFileToNull = this.resetFileToNull.bind(this);
    this.uploadThumbnailToDB = this.uploadThumbnailToDB.bind(this);
    this.resetUpload = this.resetUpload.bind(this);
    this.checkCompletion = this.checkCompletion.bind(this)
    this.openAutoFill = this.openAutoFill.bind(this);
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        autofill_db.doc(user.uid).get().then(doc =>{
          if(doc.exists){
            document.getElementById('course').value = doc.data().course
            document.getElementById('subject').value = doc.data().subject;
            document.getElementById('grades').value = doc.data().grades;
            document.getElementById('resource').value = doc.data().resource;
            document.getElementById('description').value = doc.data().description
          } 
          else
            console.log("not here")
        })
          
        
      }
    })
  }

  componentDidUpdate(){
    
  }

  openAutoFill(event){
    this.setState({
      toggle: !this.state.toggle
    })
    document.getElementById("autofill-container").style.visibility = 'visible';
    document.getElementById('autofill-container').style.opacity  = 1;
  }
  checkCompletion(componentID_arr){

    console.log(componentID_arr);
    componentID_arr.forEach(i=>{
      if(document.getElementById(i).value===""){
        document.getElementById(i).style.border="1px solid #22B24C";


      }
    })
  }
  resetUpload(event){ //on click
    //Make each input ID.value in the array null
    let user_inputs = ["title","course", "subject", "description", "upload-thumbnail", "complete-upload-event"];
    for(let i = 0; i < user_inputs.length; i++)
      document.getElementById(user_inputs[i]).value = null;
    

    //hide all success messages components
    let success_msg = document.getElementsByClassName("SuccessMessage");
    for(let i = 0; i < success_msg.length; i++){
      success_msg[i].style.visibility = 'hidden';
      success_msg[i].style.opacity = 0;
    }

    //rerender changes with state toggle.
    this.setState({
      toggle: !this.state.toggle
    })
  }

  resetFileToNull(event){
    //TO DO: on click, empty out value to prevent duplicate uploads.
  }
  uploadThumbnailToDB(event){
    //if user is logged in 
    if(auth.currentUser){
      
      //set valid file types to a map, valid_files_map.
      let valid_files = ["jpg", "jpeg", "png"];
      let valid_files_map = new Map();
      for(let i = 0; i < valid_files.length; i++)
        valid_files_map.set(valid_files[i], i);
      

      //get file chosen by user
      let files = event.target.files;
      for(let i = 0; i < files.length; i++){
        //for each file
        //1. check if the file is a valid file type
        //2. if it is: get the cloud storage bucket
        //3. store the file to it, get the downloadURL from the bucket, and rerender the component.
        
        let file = files[i];
        let filetype = file.name.split(".").pop();
        if(valid_files_map.has(filetype)){
          let storageRef = firebase.storage().ref("THUMBNAILS_UPLOADED/"+file.name);
          
          storageRef.put(file).then(snapshot=>{
            document.getElementById("thumbnail_progress").value = "100";
            document.getElementById("thumbnail_success_msg").style.visibility = 'visible';
            document.getElementById("thumbnail_success_msg").style.opacity = 1;

            this.setState({
              thumbnail_uploaded: true
            })

            return snapshot.ref.getDownloadURL();
          }).then(downloadURL =>{
          this.setState({thumbnailURL: downloadURL})
            return downloadURL

          }).catch(error=>{
            console.log(error);
          })

        }else
          alert("This is not a file!")
      }
    }else
        alert('You need to login!')
  }

  uploadDocToDB(event){
    //create a map of each input field ID values.
    //These values will be pushed to the database.
    let upload_map = new Map();
    let componentID_arr = ["title", "course", "subject", "grades", "resource", "description"];
    for(let i = 0; i < componentID_arr.length; i++)
      upload_map.set(componentID_arr[i], document.getElementById(componentID_arr[i]).value);
    
    //if user is logged in
    let completion_array = Array.from(upload_map.values());
    if(completion_array.includes("")){
      console.log("ERROR FOUND")
      this.checkCompletion(componentID_arr)
      this.setState({
        completion_error: true
      })
    }else if(auth.currentUser){
      //get the files selected
      let files = event.target.files;
      for(let i = 0; i < files.length; i++){
        //for each file, get a reference to the storage location
        let curr_file = files[i];

        let storageRef = firebase.storage().ref("FILES_APPROVED/"+curr_file.name)

        //push the file to the cloud storage location
        storageRef.put(curr_file).then(snapshot =>{
          //The changes come in asynchronously, so the UI will update when document upload is successful.
          //Show success message when progress reaches complete
          document.getElementById("doc_progress").value = "100"; 
          document.getElementById("doc_success_msg").style.visibility = 'visible';
          document.getElementById("doc_success_msg").style.opacity = 1;    
          componentID_arr.forEach(i=>{
         
              document.getElementById(i).style.border="1px solid #ced4da";
      
      
      
          })
          //rerender
          this.setState({ 
            document_uploaded: true,
            completion_error: false
          })

          //pass the DownloadURL of the file uploaded to db.
          return snapshot.ref.getDownloadURL();
        }).then(downloadURL =>{ 
          //The thumbnail SHOULD be selected before. So the thumbnail URL state will be ready for this proces.
          //pass the important data to database to be gotten in the Library component
          upload_db.add({
            title: upload_map.get("title"),
            course: upload_map.get("course"),
            subject: upload_map.get("subject"),
            grades: upload_map.get("grades"),
            resource: upload_map.get("resource"),
            description: upload_map.get("description"),
            thumbnailURL: this.state.thumbnailURL,
            downloadURL: downloadURL,
            uid: auth.currentUser.uid,
            uid_photo: auth.currentUser.photoURL,
            uid_name: auth.currentUser.displayName
          })
          
        }).catch(error =>{
          console.log(error);
        })
      }
    }else
      alert("You need to log in!")
    


  }

  render(){
    return (
      <section className="Upload flex-border-row-centered-wrap">
        <div id="header">
          <h2>Upload</h2>
        </div>
        <AutoFill />
        {/* Section of the UI that contains form fields */}
        <section className="Inputs flex-border-column-centered">
          {this.state.completion_error ? <FormFailureMessage msg="You must fill out the form to upload to the library" />:null}

          <div id="button-set" className="flex-border-row-centered">
          <span id="autofill-button-click-container" className="upload-ui-options" onClick={this.openAutoFill}>
            <FontAwesomeIcon icon={faRecycle} id="autofill-icon" /> Autofill
          </span>
          {/* Reset Button */}
          <span id="reset-button-click-container" className="upload-ui-options" onClick={this.resetUpload}>
            <FontAwesomeIcon icon={faRedoAlt} id="redo-icon" /> New Upload
          </span>
          </div>


          <TextField label="Title" id="title" placeholder="Final Review"/>
          <TextField label="Course Category" id="course" placeholder="Mathematics"/>
          <TextField label="Subject" id="subject" placeholder="Geometry"/>
          <SelectField label="Grade Levels" id="grades" options={["K-2", "3-5","6-8","9-12"]} />
          <SelectField label="Resource type" id="resource" options={["Package", "Lesson Plan", "Project", "Worksheet", "Group Work","Activities"]} />
          <TextArea label="Short Description" id="description"/>
        </section>

        {/* Section of the UI that contains upload boxes */}
        <section className="Uploads"> 
          {/* Upload Thumbnail */}
          <section className="UploadFile flex-border-column-centered">
            <label for="upload-thumbnail" className="hover-me flex-border-column-centered">Thumbnail
            <br/>
            <FontAwesomeIcon icon={faImage} />
            <input id="upload-thumbnail" type="file" onChange={this.uploadThumbnailToDB} />
            </label>
            <ProgressBar for="thumbnail_progress" />
            <SuccessMessage id="thumbnail_success_msg" message="Thumbnail is attached to upload." />
          </section>

          {/* Upload File and complete submission */}
          <section className="UploadFile flex-border-column-centered">
            <label for="complete-upload-event" className=" hover-me flex-border-column-centered">  
              Upload to Appletree
              <br/>
              <FontAwesomeIcon icon={faCloudUploadAlt} />
              <input onClick={this.resetFileToNull} onChange={this.uploadDocToDB} id="complete-upload-event" type="file"/>
            </label>

            <ProgressBar for="doc_progress"/>
            <SuccessMessage id="doc_success_msg" message="Document is uploaded for review. We'll get back to you soon :)" />
          </section>
        </section>

      </section>
    );
  }
  
}

export default Upload; 

