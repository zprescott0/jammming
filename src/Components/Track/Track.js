import React from 'react';

import './Track.css';

export class Track extends React.Component {
    constructor (props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    
    //Adds a track from the SearchResults to the Playlist
    //using the method defined in App.js.
    addTrack () {
        this.props.onAdd( {
            TrackName: this.props.trackName,
            TrackArtist: this.props.trackArtist,
            TrackAlbum: this.props.trackAlbum,
            id: this.props.id,
            uri: this.props.uri,
            preview_url: this.props.preview_url
        } );
    }

    //Removes a track from the Playlist component using
    //the method defined in App.js.
    removeTrack () {
        this.props.onRemove({
            TrackName: this.props.trackName,
            TrackArtist: this.props.trackArtist,
            TrackAlbum: this.props.trackAlbum,
            id: this.props.id
        });
    }
    
    //Returns a button element with either '+' or '-' depending
    //on isRemoval property.
    renderAction () {
        if (this.props.isRemoval) {
            return <button className="Track-action"
            onClick={this.removeTrack}>-</button>;
        }
        else {
            return <button className="Track-action"
            onClick={this.addTrack}>+</button>;
        }
    }

    //Returns a link to the song preview.
    renderPreview () {
        if (this.props.preview_url === null) {
            return;
        }

        return <a href={this.props.preview_url}
        className="Track-preview"
        target="_blank">Have a listen!</a>;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.trackName}</h3>
                    <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
                    {this.renderPreview()}
                </div>
                {this.renderAction()}
            </div>
        );
    }
}