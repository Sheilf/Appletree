import * as firebase from 'firebase';
import './firebase-config';




export let database = firebase.firestore();
export let storage = firebase.storage();
export let auth = firebase.auth();
export let upload_db = database.collection("uploads")
export let thumbnail_db = database.collection("thumbnails");
export let star_db = database.collection("stars");
export let autofill_db = database.collection("autofill");