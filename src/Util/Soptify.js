const clientId = "46651d35a2de4b73ac45f6954cf26272";
const clientSecret = "29abae08735b45b2820c6f286019b826";
const redirectUri = "http://localhost:3000/";
let userAccessToken;

const spotify = {
    getAccessToken(){

        if(userAccessToken){
            return userAccessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            userAccessToken = accessTokenMatch[1];
            const expriesIn = +expiresInMatch[1];

            setTimeout(()=>{
                userAccessToken = "";
            },expriesIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken
        }

        if(!userAccessToken){
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        }
        return userAccessToken
    },
    search(term){
        userAccessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: { Authorization: `Bearer ${userAccessToken}` }
        }).then(response => {
            return response.json();
        }).then(data => {
            
            if (!data.tracks) {
                return [];
            }
            return data.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    albumL: track.album.name,
                    url: track.uri
                }
            })
        });
    },
    savePlaylist(name, trackUris){
        if(!name || !trackUris){
            return 
        }
        let accessToken = this.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`}
        let userId;
        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response=>{
            return response.json();
        }).then(jsonResponse=>{
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {headers: headers,
            method: "POST",
        body: JSON.stringify({name: name})})
        }).then(response=>{
            return response.json();
        }).then(responseJson=>{
            const playlistID = responseJson.id;
        })
    }
}

export default spotify
