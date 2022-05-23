import React from 'react';
import './App.css';
import { ReactComment } from '../Other/HTMLComment';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { searchResults: [ {
      TrackName: 'Track Name 1',
      TrackArtist: 'Track Artist 1',
      TrackAlbum: 'Track Album 1',
      id: 1000,
      uri: 'qwer'
    }, 
    {
      TrackName: 'Track Name 2',
      TrackArtist: 'Track Artist 2',
      TrackAlbum: 'Track Album 2',
      id: 1001,
      uri: 'asdf'
    }, 
    {
      TrackName: 'Track Name 3',
      TrackArtist: 'Track Artist 3',
      TrackAlbum: 'Track Album 3',
      id: 1002,
      uri: 'zxcv'
    }
      ],
    playlistName: 'DEBUG Playlist',
    playlistTracks: [
      {
        TrackName: 'Track Name 4',
        TrackArtist: 'Track Artist 4',
        TrackAlbum: 'Track Album 4',
        id: 1003,
        uri: 'tyui'
      }, 
      {
        TrackName: 'Track Name 5',
        TrackArtist: 'Track Artist 5',
        TrackAlbum: 'Track Album 5',
        id: 1004,
        uri: 'ghjk'
      }, 
      {
        TrackName: 'Track Name 6',
        TrackArtist: 'Track Artist 6',
        TrackAlbum: 'Track Album 6',
        id: 1005,
        uri: 'bnmm'
      }
    ]};

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
    const trackURIs = [];
    for (let track of this.state.playlistTracks) {
      trackURIs.push(track.uri);
    }

    console.log(trackURIs);
  }

  //************************************************** */
  //Updates the search results with a response from
  //Spotify.
  search (searchTerm) {
    //console.log(searchTerm);
    Spotify.search(searchTerm).then((resolveValue) => {
      console.log('Resolved.');
      //console.log(resolveValue);
      if (resolveValue === undefined)
        return;
      else {
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
        <button onClick={Spotify.getAccessToken}>Test</button>
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
