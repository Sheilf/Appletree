



import React, {Component} from 'react';
import './HeaderWithSearch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import {Link, Redirect} from 'react-router-dom';




class HeaderWithSearch extends Component {

  constructor(props){
    super(props);
    this.state={
      searchFromHome: "",
      redirected: false
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount(){

  }
  submitSearch(event){
    this.setState({
      redirected: true
    })
  }
  updateSearch(event){
    this.setState({
      searchFromHome: event.target.value
    })
  }
  render(){
 
    return (
      <section className="HeaderWithSearch flex-border-column-centered">
      {
        this.state.searchFromHome === "" && this.state.redirected ? <Redirect to="/library" />
        :
        this.state.redirected ? 
          <Redirect to={"/search/"+this.state.searchFromHome}/>
        :
        (<div id="react-needs-parent" className="flex-border-column-centered">
          <h2>Search Through Our Library <br />For Classroom Resources</h2>
          <form onSubmit={this.submitSearch}>
            <label className="flex-border-row-centered"> 
              <Link to={"/search/"+this.state.searchFromHome}>
                <FontAwesomeIcon id="hover-search" icon={faSearch} />
              </Link>
              <input class="form-control form-control-lg" type="text" placeholder="Appletree Library" id="inputLarge" onChange={this.updateSearch} />
            </label> 
          </form>
          </div>
        )
      }
        
      </section>
    );
  }
  
}

export default HeaderWithSearch;

