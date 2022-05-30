import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []};

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //************************************************ */
  //Adds a track to the playlist from the search results.
  addTrack (track) {

    if (this.state.playlistTracks.find(
      playlistTrack => playlistTrack.id === track.id))
    {
      //Track is already present.
      return;
    }
    else {
      //Track is NOT present.
      let tempPlaylistTracks = this.state.playlistTracks;
      tempPlaylistTracks.push(track);

      this.setState({ playlistTracks: tempPlaylistTracks });
    }
  }

  //******************************************* */
  //Removes a track from the playlist.
  removeTrack (track) {
    const updatedTracks = [];

    //Loop to separate the track from the playlist
    for (let playlistTrack of this.state.playlistTracks) {
      if (playlistTrack.id !== track.id)
        updatedTracks.push(playlistTrack);
    }

    this.setState({ playlistTracks: updatedTracks });
  }

  //************************************************* */
  //Updates the playlist name.
  updatePlaylistName (name) {
    this.setState({ playlistName: name });
  }

  //************************************************** */
  //Saves an array of tracks and a playlist name to a user's
  //Spotify account.
  savePlaylist() {
    //Obtain track URIs.
    const trackURIs = [];
    for (let track of this.state.playlistTracks) {
      trackURIs.push(track.uri);
    }

    //Save playlist to Spotify.
    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    //Reset state.
    this.setState({ playlistName: 'New Playlist ',
    playlistTracks: []});
  }

  //************************************************** */
  //Updates the search results with a response from
  //Spotify.
  search (searchTerm) {
    Spotify.search(searchTerm).then((resolveValue) => {
      if (resolveValue === undefined)
        return;
      else {
        console.log(resolveValue);
        this.setState({ searchResults: resolveValue});
      }
    }).catch((rejectValue) => {
      console.error('Rejected.');
      console.error(rejectValue);
    });
  }

  //************************************************* */
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
