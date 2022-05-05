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

            const accessTokenRegex = /access_token=([^&]*)/;
            const expiresInRegex = /expires_in=([^&]*)/;

            const capturedAccessToken = url.href.match(accessTokenRegex);
            const capturedExpiredValue = url.href.match(expiresInRegex);

            if (capturedAccessToken !== null) {
                userAccessToken = capturedAccessToken[1];
                expireTime = capturedExpiredValue[1];
            }
        }
    }
};

export { Spotify };