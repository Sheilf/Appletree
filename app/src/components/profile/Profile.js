
import React, {Component} from 'react';
import './Profile.css';

//import firebase
import '../../firebase-config';
import {upload_db} from '../../firebase-imports';
import LibraryItem from '../library/LibraryList/LibraryItem';
import '../../styles/flex-border.css'





class Profile extends Component {

  constructor(){
    super();
    this.state={
      user_profile_photo: "https://res.cloudinary.com/eduprojectsil/image/upload/e_shadow:40/v1531605362/appletree_mdbesb.png",
      user_name: "",
      items: []
    }
  }

  componentDidMount(){
    let cards = upload_db.where("uid", '==', this.props.match.params.userProfileID).get().then(querySnapshot =>{
        let items = querySnapshot.docs.map(doc =>(
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

        let name = ''
        let photo = ''
        let user_data = querySnapshot.forEach(doc=>{
            name = doc.data().uid_name;
            photo = doc.data().uid_photo

            console.log(name, photo)
        })
        console.log(querySnapshot.docs)
        this.setState({
            user_name: name,
            user_profile_photo: photo
        })
        return items
    }).then(items =>{
        this.setState({
            items: items
        })
    })



  }
  render(){
    return (
      <section className="Profile flex-border-column-centered">
        <p className="profile_container flex-border-column-centered">
        <img id="user_profile_photo" src={this.state.user_profile_photo} />
        <br/>
        {this.state.user_name}
        </p>

        <div id="card-container" className='profile_container flex-border-row-centered-wrap'>
            {this.state.items}
        </div>
      </section>
    );
  }
  
}

export default Profile;

