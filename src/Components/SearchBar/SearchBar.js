import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {searchTerm: ''};

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    //********************************************** */
    //Calls search method in App.js with the searchTerm in
    //the SearchBar component.
    search () {
        this.props.onSearch(this.state.searchTerm);
    }

    //********************************************** */
    //Changes the state of searchTerm.
    handleTermChange (event) {
        this.state = { searchTerm: event.target.value };
    }

    //********************************************** */
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter a Song, Album, or Artist"
                onChange={this.handleTermChange} />
                <button className="SearchButton"
                onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}