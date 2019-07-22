
import React, {Component} from 'react';
import './LibraryList.css';
import '../../../styles/flex-border.css';
import {upload_db} from '../../../firebase-imports'
import LibraryItem from './LibraryItem';

/*
  LibraryList generates the list of LibraryItems that users can portal into for downloads and saves.
*/
class LibraryList extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [],
    }
  }

  componentDidMount(){
    //get the list of uploads from database
    //generate LibraryItems from each upload and its database fields.

    let paginate = upload_db.orderBy('resource').limit(500);
    paginate.get().then(querySnapShot =>{
      let items = querySnapShot.docs.map((doc)=>(
        <LibraryItem 
          route={doc.id}
          title ={doc.data().title}
          resource={doc.data().resource}
          course={doc.data().course}
          grades={doc.data().grades}
          subject={doc.data().subject}
          thumbnailURL = {doc.data().thumbnailURL} 
        />
      ))

      let last_order = querySnapShot.docs[querySnapShot.docs.length - 1];
      console.log("Last: ", last_order);

      let next = upload_db.orderBy('resource').startAfter(last_order).limit(500);
      // //rerender changes
      // console.log(next);
      this.setState({items: items}) 
      
    })

  }

  render(){
    return (
      <section id="library-list" className="LibraryList flex-border-row-centered-wrap"> 
        {this.state.items}
      </section>
    );
  }
  
}

export default LibraryList;

