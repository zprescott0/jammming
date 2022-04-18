import React from 'react';

export class Playlist extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue="New Playlist" />
                {/*A tracklist component goes here*/}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}