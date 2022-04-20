import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/* Map method needed here to render a set of Track
                component.*/}
                {/* Below, I've hardcoded some tracks for testing
                purposes. They should be deleted later. */}
                <Track trackName='DEBUG Track Name' 
                trackArtist='DEBUG Track Artist'
                trackAlbum='DEBUG Track Album'
                isRemoval={false}/>
                <Track trackName='DEBUG Track Name 2' 
                trackArtist='DEBUG Track Artist 2'
                trackAlbum='DEBUG Track Album 2'
                isRemoval={false}/>
                <Track trackName='DEBUG Track Name 3' 
                trackArtist='DEBUG Track Artist 3'
                trackAlbum='DEBUG Track Album 3'
                isRemoval={true}/>
            </div>
        );
    }
}