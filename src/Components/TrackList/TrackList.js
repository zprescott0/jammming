import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        const tracks = this.props.tracks;
        let formattedTracks = '';

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
            key={x.id}/>);
        }

        //console.log(tracks);

        return (
            <div className="TrackList">
                {formattedTracks}
            </div>
        );
    }
}