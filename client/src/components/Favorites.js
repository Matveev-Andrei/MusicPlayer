import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import { Container } from 'react-bootstrap'

export default function Favorites(props) {
    const spotifyApi = props.spotifyApi
    const accessToken = props.accessToken
    const [user, setUser] = useState({});
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then((res) => {
                setUser(res.data[0])
                setFavorites(res.data[0].favoriteSongs)
                console.log(res.data[0])
            })
    }, [])

    console.log(user)

    return (
        <div style={{background: "linear-gradient(#212c39, #121e3d 50%, #000)"}}>
        <Container style={{  height: '100vh', backgroundColor:"#d0d7de" }} >
            <h1 className="mb-4 text-left">Your Favorites</h1>
            <div className="d-flex align-items-center">
                {favorites.map((track) => (
                    <div className="d-inline-flex flex-wrap m-2 justify-content-center align-items-start border border-dark rounded-lg p-2" 
                    style={{ width: '12.5%', height: "20vh", backgroundColor:"#3c415c" }}>
                        <img style={{ width: '100%' }} src={track.image} alt="" />
                        <div>
                            <div className="text-white">{track.name}</div>
                            <div className="text-muted">{track.artist}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
        </div>
    )
}
