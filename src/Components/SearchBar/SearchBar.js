import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {searchTerm: 'TestTerm'};

        this.search = this.search.bind(this);
    }

    //********************************************** */
    //Calls search method in App.js with the searchTerm in
    //the SearchBar component.
    search () {
        this.props.onSearch(this.state.searchTerm);
    }

    //********************************************** */
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter a Song, Album, or Artist" />
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
}