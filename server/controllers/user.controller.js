require('dotenv').config();
const User = require('../models/user.model');
const SpotifyWebApi = require('spotify-web-api-node');

module.exports = {
    login: (req, res) => {
        const code = req.body.code;

        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });

        spotifyApi.authorizationCodeGrant(code)
            .then(data => {
                res.json({
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in
                });
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400)
            });
    },

    refresh: (req, res) => {
        const refreshToken = req.body.refreshToken;

        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken
        });

        spotifyApi.refreshAccessToken()
            .then((data) => {
                res.json({
                    accessToken: data.body.accessToken,
                    expiresIn: data.body.expiresIn
                });
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    create: (req, res) => {
        
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(req.body.accessToken);
        
        (async () => {
            const user = await spotifyApi.getMe();
            console.log(user.body);
            
            User.create({
                username: user.body.id,
                email: user.body.email,
                display_name: user.body.display_name,
            })
                .then((newUser) => {
                    res.json(newUser);
                })
                .catch((err) => {
                    console.log("Error found in create");
                    console.log(err);
                    res.json(err);
                })
        })()
            .catch(err => {
                console.error(err);
            });

    }
}