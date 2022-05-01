import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor (props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    //*********************************************** */
    //A method for updating the current name of the playlist.
    handleNameChange (event) {
        this.props.onNameChange(event.target.value);
    }

    //************************************************ */
    render() {
        //console.log(this.props.playlistTracks);

        return (
            <div className="Playlist">
                <input defaultValue="New Playlist"
                onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemoval={true} />
                <button className="Playlist-save"
                onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}