import React from 'react';

import './Track.css';

export class Track extends React.Component {
    //Returns a button element with either '+' or '-' depending
    //on isRemoval property.
    renderAction () {
        let action = '';
        if (this.props.isRemoval) {
            action = '-';
        }
        else {
            action = '+';
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