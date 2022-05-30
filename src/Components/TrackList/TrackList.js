import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        const tracks = this.props.tracks;
        let formattedTracks = '';

        let num = 0;

        if (tracks === undefined)
        {
            formattedTracks = <p>-------------------</p>;
        }
        else
        {
            formattedTracks = tracks.map(x => <Track trackName={x.TrackName}
            trackArtist={x.TrackArtist}
            trackAlbum={x.TrackAlbum}
            isRemoval={this.props.isRemoval}
            id={x.id}
            uri={x.uri}
            preview_url={x.preview_url}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            key={num++} />);
        }

        return (
            <div className="TrackList">
                {formattedTracks}
            </div>
        );
    }
}