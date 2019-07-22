
import React, {Component} from 'react';
import './Library.css';
import '../../styles/flex-border.css';
import TextField from '../common/user-inputs/TextField';
import RadioForm from '../common/user-inputs/RadioForm';
import SelectField from '../common/user-inputs/SelectField';
import LibraryList from './LibraryList/LibraryList'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRedoAlt } from '@fortawesome/free-solid-svg-icons';


//Refer to the Imprvovements.txt file: this component is not written following React design
//and may result in bugs in the future.
//It relies too much on the DOM with document.getElement instead of using and lifting React State.
//This change is not high priority: but it is a good way to see the React Way of Things

class Library extends Component {
  constructor(props){
    super(props);
    this.state={
      searchedFromHome: false,
      homeSearchInput: [],
      toggle: false
      
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.oneFilterSearch = this.oneFilterSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidMount(){
    // iif(this.props.location.pathName){
    //    this.setState({searchedFromHome: true})
    // }
    let arr = [];
    if(this.props.location.pathname.includes("/search")){


      document.getElementById('inputValid').value = this.props.match.params.searchID
      arr = [this.props.match.params.searchID.toLowerCase()];
      this.setState({
        searchedFromHome: true,
        homeSearchInput: arr 
      })
 

      this.oneFilterSearch(arr)
      
    }


  }

  componentDidUpdate(){
    if(this.state.searchedFromHome){
 
    }else{
     
    }
  }
  resetSearch(event){ //onclick
    // let fieldIDs = ['inputValid', "select-field", "form-container"]
    //reset the filter values to empty.
    document.getElementById("inputValid").value = null;
    document.getElementById("select-field").selectedIndex = 0;
    let radios = document.getElementsByName('customRadio');
    for(let i = 0; i < radios.length; i++)
      radios[i].checked = false;    
    
  }
  oneFilterSearch(searchTerm){

    this.setState({
      toggle: !this.state.toggle

    })
   
    //This search function needs to handle  filters strictly. 
    //It currently presents a card if it satisfies ANY filter condition

    //It does not rerender values either, so pagination will cause problems here.
    let card_set = Array.from(document.getElementsByClassName("search-cards"));

    for(let i = 0; i < card_set.length; i++){
      let text = card_set[i].innerText.toLowerCase();
      if(text.includes(...searchTerm)){
        card_set[i].parentElement.style.opacity = 1;
        card_set[i].parentElement.style.visibility = 1;
        card_set[i].parentElement.style.display = 'flex';

      }else{
        card_set[i].parentElement.style.opacity = 0;
        card_set[i].parentElement.style.visibility = 0;
        card_set[i].parentElement.style.display = 'none';

      }
    }
  }

  
  handleSearch(){
    //get filter values
    let search_map = new Map()
    if(document.getElementById('inputValid').value.length > 0)
      search_map.set(1, document.getElementById('inputValid').value.toLowerCase());
  
    
    let radio_buttons = document.getElementById('form-container').elements;
    for(let i = 0; i < radio_buttons.length; i++){
      if(radio_buttons[i].checked)
        search_map.set(2, radio_buttons[i].id.toLowerCase())
    }

    search_map.set(3, document.getElementById('select-field').value.toLowerCase())

    //perform a search on an array of filter values.
    this.oneFilterSearch(Array.from(search_map.values()));

  }
  render(){
    return (
      <section className="Library flex-border-row-wrap" onLoad={this.searchFromHome}>
           
        {/* section for search filter fields and buttons */}
        <section class="Form-container flex-border-column-centered"> 
          <TextField label="Search" />
          <RadioForm label="Grades" radioID = {["K-2", "3-5", "6-8", "9-12"]} id="radio-form"/>
          <SelectField label="Resource" size = {5} resources={["Package", "Lesson Plan", "Project", "Worksheet", "Group Work", "Activities"]} id="select-field" />

          <div className="flex-border-row">
            <button onClick={this.handleSearch}><FontAwesomeIcon icon={faSearch} /></button>

            <button onClick={this.resetSearch}> 
              <FontAwesomeIcon icon={faRedoAlt} />
            </button>
          </div>
        </section>
        
        {/* Section to display library */}
        <section class="Library-container flex-border-row-wrap">
          <h2>Library</h2>
          <LibraryList />
        </section>

      </section>
    );
  }
  
}

export default Library;

