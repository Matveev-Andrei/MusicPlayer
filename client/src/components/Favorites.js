import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap'
import { Link, navigate } from '@reach/router';
import Button from '@material-ui/core/Button';

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
        <div style={{ background: "linear-gradient(#212c39, #121e3d 50%, #000)" }}>
            <Container style={{ height: '100vh', backgroundColor: "#d0d7de", padding: "2%" }} >
                <div className="d-flex justify-content-between">
                    <h1 className="mb-4 text-left">{user.display_name}'s Favorites 🎵</h1>
                    <div>
                        <Button className="mr-4" onClick={() => navigate('/')} variant="contained" color="primary">
                            Home
                        </Button>
                        <Button onClick={() => navigate('/library')} variant="contained" color="primary">
                            Search
                        </Button>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    {favorites.map((track) => (
                        <div className="d-inline-flex flex-wrap m-2 justify-content-center align-items-start border border-dark rounded-lg p-2"
                            style={{ width: '12.5%', height: "20vh", backgroundColor: "#3c415c" }}>
                            <Link to={`/details/${track.songId}`}><img style={{ width: '100%' }} src={track.image} alt="" /></Link>
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
