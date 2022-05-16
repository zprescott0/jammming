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
            }
            else {
                const baseURL = 'https://accounts.spotify.com/authorize';
                const queryParameters = `?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
                const URL = `${baseURL}${queryParameters}`;
                window.location = URL;
            }
        }
    }
};

export { Spotify };