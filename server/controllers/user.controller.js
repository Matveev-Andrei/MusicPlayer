require('dotenv').config();
const User = require('../models/user.model');
const SpotifyWebApi = require('spotify-web-api-node');

module.exports = {
    login: (req, res) => {
        const code = req.body.code;
        console.log(req.body.code)
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
                        
            User.create({
                username: user.body.id,
                email: user.body.email,
                display_name: user.body.display_name,
            })
                .then((newUser) => {
                    res.json(newUser);
                    console.log(newUser);
                })
                .catch((err) => {
                    if(err.code === 11000 && err.name === 'MongoError') {
                        console.log("found user")
                        console.log(user.body.id)
                        User.findOne({username: user.body.id})
                            .then((foundUser) => res.json(foundUser));
                    } 
                    else {
                    console.log("Non-duplicate error found in create");
                    console.log(err);
                    res.json(err); 
                    }
                })
        })()
            .catch(err => {
                console.error(err);
            });
        
        // Need to check and handle duplicated user
    },

    getAll: (req, res) => {
        User.find({})
            .then((allUsers) => {
                res.json(allUsers);
            })
            .catch((err) => {
                console.log("error found in getAll");
                console.log(err);
                res.json(err);
            });
    }, 

    delete: (req, res) => {
        User.findByIdAndDelete( req.params.id )
            .then((deletedUser) => {
                console.log(deletedUser);
                res.json(deletedUser);
            })
            .catch((err) => {
                console.log("error found in delete");
                console.log(err);
                res.json(err);
            });
    },

    addSong: (req, res) => {
        console.log(req.body)
        console.log(req.params)
        User.findByIdAndUpdate({_id : req.params.id}, {
            
            $push: {
                favoriteSongs: {
                    songId: req.body.songId,
                    name: req.body.name,
                    artist: req.body.artist,
                    image : req.body.image
                }
            }
        },
        {
            new: true,
            runValidators: true
        })
            .then((updatedUser) => {
                console.log(updatedUser);
                res.json(updatedUser);
            })
            .catch((err) => {
                console.log("error found in addSong");
                console.log(err);
                res.json(err);
            })
    },

    removeSong: (req, res) => {
        User.findByIdAndUpdate(req.body.userId, {
            $pull: {
                "favoriteSongs": {
                    songId: req.body.songId
                }
            }
        }, {new: true})
            .then((updatedUser) => {
                console.log(updatedUser);
                res.json(updatedUser);
            })
            .catch((err) => {
                console.log("error found in removeSong");
                console.log(err);
                res.json(err);
            })
    },

}