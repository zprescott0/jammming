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
    this.removeTrack = this.removeTrack.bind(this);
    this.testRemoveTrack = this.testRemoveTrack.bind(this);
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
    console.log(updatedTracks);
  }

  //**************************************************** */
  //A function for testing the removeTrack method. Should
  //be removed later.
  testRemoveTrack () {
    this.removeTrack({ id: 1000 });
  }

  //************************************************* */
  render() {
    return (
      <div>
        <button onClick={this.testRemoveTrack}>Test button</button>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
