const REDIRECT_URI = 'http://localhost:3000/';
//const REDIRECT_URI = 'http://zprescott-jammming.surge.sh';
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
                const queryParameters = `?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}`;
                const URL = `${baseURL}${queryParameters}`;
                window.location = URL;
            }
        }
    },

    //********************************************************************** */
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

        let searchedTracks = [];    //Will hold objects with the desired information from Spotify.
        let idArray = [];   //Holds the ids of every track. Needed to obtain preview urls.

        //Obtain data from Spotify
        const response = await fetch(endPoint, options);
        if (response.ok) {
            const jsonResponse = await response.json();

            //Convert data into a usable format
            for (let track of jsonResponse.tracks.items) {
                searchedTracks.push({
                    id: track.id,
                    TrackName: track.name,
                    TrackArtist: track.artists[0].name,
                    TrackAlbum: track.album.name,
                    uri: track.uri
                });
                idArray.push(track.id);
            }
        }
        else {
            throw new Error('Error in request.');
        }

        //Another request is sent to obtain the previews of each song.
        const baseURL2 = 'https://api.spotify.com/v1/tracks';
        const query2 = `?ids=${idArray.join(',')}`;
        const endpoint2 = `${baseURL2}${query2}`;

        //Send request
        const response2 = await fetch(endpoint2, options);
        if (response2.ok) {
            const jsonResponse2 = await response2.json();

            for (let i = 0; i < jsonResponse2.tracks.length; i++) {
                searchedTracks[i].preview_url = jsonResponse2.tracks[i].preview_url;
            }
        } 
        else {
            console.error('Error when obtaining song previews.');
            console.error(await response2.json());
            return;
        }

        return searchedTracks;
    },

    //************************************************************* */
    savePlaylist: async (playlistName, trackURIs) => {
        //Check if there are values saved to the parameters:
        if (playlistName === '' || trackURIs.length === 0) {
            return;
        }

        //Set variables for request.
        let accessToken = Spotify.getAccessToken();
        const requestHeaders = {
            Authorization: `Bearer ${accessToken}`
        };
        let userID = '';

        //1. GET current user id.
        const response = await fetch('https://api.spotify.com/v1/me', { headers: requestHeaders });
        if (response.ok) {
            const jsonResponse = await response.json();
            userID = jsonResponse.id;
        }
        else {
            throw new Error('Error in request to get user ID.');
        }

        //2. Post new playlist and get back playlist id.
        const url2 = `https://api.spotify.com/v1/users/${userID}/playlists`;
        const body2 = {
            name: playlistName,
            public: false,
            description: 'A playlist created through the jammming app.'
        };
        let playlistID = '';

        const response2 = await fetch(url2, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(body2)
        });

        if (response2.ok) {
            const jsonResponse2 = await response2.json();
            playlistID = jsonResponse2.id;
        }
        else {
            console.error(response2);
            console.error(await response2.json());
            throw new Error('Error when creating playlist');
        }

        //3. Send track URIs to newly created playlist.
        const url3 = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
        const body3 = {
            uris: trackURIs
        };

        const response3 = await fetch(url3, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(body3)
        });

        if (response3.ok) {
            return 'Success';
        }
        else {
            console.error(await response3.json());
            throw new Error('Error when saving tracks to playlist.');
        }
    }

};

export { Spotify };