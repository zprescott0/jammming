import React from 'react';
import './App.css';
import { ReactComment } from '../Other/HTMLComment';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { searchResults: [ {
      TrackName: 'Track Name 1',
      TrackArtist: 'Track Artist 1',
      TrackAlbum: 'Track Album 1',
      id: 1000
    }, 
    {
      TrackName: 'Track Name 2',
      TrackArtist: 'Track Artist 2',
      TrackAlbum: 'Track Album 2',
      id: 1001
    }, 
    {
      TrackName: 'Track Name 3',
      TrackArtist: 'Track Artist 3',
      TrackAlbum: 'Track Album 3',
      id: 1002
    }
      ],
    playlistName: 'DEBUG Playlist',
    playlistTracks: [
      {
        TrackName: 'Track Name 4',
        TrackArtist: 'Track Artist 4',
        TrackAlbum: 'Track Album 4',
        id: 1003
      }, 
      {
        TrackName: 'Track Name 5',
        TrackArtist: 'Track Artist 5',
        TrackAlbum: 'Track Album 5',
        id: 1004
      }, 
      {
        TrackName: 'Track Name 6',
        TrackArtist: 'Track Artist 6',
        TrackAlbum: 'Track Album 6',
        id: 1005
      }
    ]};

    this.addTrack = this.addTrack.bind(this);
    this.testAddTrack = this.testAddTrack.bind(this);
  }

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
      console.log(tempPlaylistTracks);

      this.setState({ playlistTracks: tempPlaylistTracks });
    }

    //console.log(this.state.)
  }

  testAddTrack () {
    this.addTrack({ TrackName: 'Track Name 7',
      TrackArtist: 'Track Artist 7',
      TrackAlbum: 'Track Album 7', 
      id: 1006 });
  }

  render() {
    return (
      <div>
        <button onClick={this.testAddTrack}>TestButton</button>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
