let userAccessToken = '';

const Spotify = {
    getAccessToken: () => {
        if (userAccessToken !== '') {
            return userAccessToken;
        }
        else {
            //User Access Token is not set. Authorization needed.
            const url = window.location.href;
            console.log(url);
        }
    }
};

export { Spotify };