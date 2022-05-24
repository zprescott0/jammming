const REDIRECT_URI = 'http://localhost:3000/';
const CLIENT_ID = '71ed11cd1119442890ce8a673afa6305';

let userAccessToken = '';
let expireTime = 0;

const Spotify = {
    getAccessToken: () => {
        if (userAccessToken !== '') {
            return userAccessToken;
        }
        else {
            //User Access Token is not set. Authorization needed.
            const url = new URL(window.location.href);
            //const url = new URL('http://www.testurl.com/my/path#access_token=qWeR&expires_in=5');

            const accessTokenRegex = /access_token=([^&]*)/;
            const expiresInRegex = /expires_in=([^&]*)/;

            const capturedAccessToken = url.href.match(accessTokenRegex);
            const capturedExpiredValue = url.href.match(expiresInRegex);

            if (capturedAccessToken !== null) {
                userAccessToken = capturedAccessToken[1];
                expireTime = capturedExpiredValue[1];

                setTimeout(() => {
                    userAccessToken = '';
                }, expireTime * 1000);
                window.history.pushState('Access Token', '', '/');

                return userAccessToken;
            }
            else {
                const baseURL = 'https://accounts.spotify.com/authorize';
                const queryParameters = `?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
                const URL = `${baseURL}${queryParameters}`;
                window.location = URL;
            }
        }
    },

    search: async (searchTerm) => {

        //Confirm access token is available.
        if (!(userAccessToken)) {
            Spotify.getAccessToken();
            
            //Prevents program from sending request if accessToken is not available.
            if ( !(userAccessToken) ) {
                return;
            }
        }

        //Set up request.
        const baseURL = 'https://api.spotify.com/v1/search';
        const queryParameters = `?type=track&q=${searchTerm}`;
        const endPoint = baseURL + queryParameters;

        const options = {
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        };

        //Obtain data from Spotify
        const response = await fetch(endPoint, options);
        if (response.ok) {
            const jsonResponse = await response.json();

            //Convert data into a usable format
            let searchedTracks = [];
            for (let track of jsonResponse.tracks.items) {
                searchedTracks.push({
                    id: track.id,
                    TrackName: track.name,
                    TrackArtist: track.artists[0].name,
                    TrackAlbum: track.album.name,
                    uri: track.uri
                });
            }

            return searchedTracks;
        }
        else {
            throw new Error('Error in request.');
        }
    },

    savePlaylist: async (playlistName, trackURIs) => {
        //Check if there are values saved to the parameters:
        if (playlistName === '' || trackURIs.length === 0) {
            return;
        }

        //Set variables for request.
        let accessToken = userAccessToken;
        const requestHeaders = {
            Authorization: `Bearer ${accessToken}`
        };
        let userID = '';

        //GET current user id.
        const response = await fetch('https://api.spotify.com/v1/me', { headers: requestHeaders });
        if (response.ok) {
            const jsonResponse = await response.json();
            userID = jsonResponse.id;
        }
        else {
            throw new Error('Error in request to get user ID.');
        }

        console.log(userID);

        //Post new playlist and get back playlist id.

        //Send track URIs to newly created playlist.
    }

};

export { Spotify };