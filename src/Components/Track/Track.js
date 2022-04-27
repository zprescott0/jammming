import React from 'react';

import './Track.css';

export class Track extends React.Component {
    constructor (props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
    }
    
    //Adds a track from the SearchResults to the Playlist
    //using the method defined in App.js.
    addTrack () {
        this.props.onAdd( {
            TrackName: this.props.trackName,
            TrackArtist: this.props.trackArtist,
            TrackAlbum: this.props.trackAlbum,
            id: this.props.id
        } );
    }
    
    //Returns a button element with either '+' or '-' depending
    //on isRemoval property.
    renderAction () {
        let action = '';
        if (this.props.isRemoval) {
            action = '-';
        }
        else {
            return <button className="Track-action"
            onClick={this.addTrack}>+</button>;
        }

        return <button className="Track-action">{action}</button>;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.trackName}</h3>
                    <p>{this.props.trackArtist} | {this.props.trackAlbum}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}