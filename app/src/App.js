import React from 'react';
import './App.css';
import './firebase-config';
import Landing from './components/landing/Landing';


/*
App Component is in the / route.
All it does is render the 3 landing sections of your typical landing page
The section prop will determine what it renders in what position.

*/

const App = () => {
    return (
      <section className="App">
        <Landing section = {1}></Landing>
        <Landing section = {2}></Landing>
        <Landing section = {3}></Landing>
      </section>
    );
}



export default App;

