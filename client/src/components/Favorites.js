import React, { useState, useEffect } from 'react';
import axios from 'axios';
import musicNinjas from '../images/MusicNinjas.png';
import { Container } from 'react-bootstrap'
import { Link, navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

export default function Favorites(props) {
    const spotifyApi = props.spotifyApi
    const accessToken = props.accessToken
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState("");
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        axios.get('http://localhost:3001/users')
            .then((res) => {
                setUser(res.data[0])
                setUserId(res.data[0]._id)
                setFavorites(res.data[0].favoriteSongs)
                console.log(res.data[0])
            })
    }, [])

    console.log(user)

    //Handler to delete song
    const deleteSong = (userId, songId) => {
        axios.put(`http://localhost:3001/removesong`, {
                userId,
                songId
        }).then((res) => {
            console.log(res.data);
            setFavorites(favorites.filter((song) => {
                console.log(song.name + " " + (song.songId !== songId))
                return song.songId !== songId
            }));
            //the line bellow is braking our current code, fixed some of the line above
            // window.location.reload(false);
        })
            .catch((err) => console.log(err))
    }



    return (
        <div style={{ background: "linear-gradient(#212c39, #121e3d 50%, #000)", minHeight: '100vh'}}>
            <Container style={{ minHeight: '100vh', backgroundColor: "#d0d7de", }} >
            <header className="p-4 mb-5">
                <div style={{ "display": "flex", "justifyContent": "center", }}>
                <img className="border rounded-lg" style={{height : "150px", boxSizing:"border-box", boxShadow:"6px 4px 4px #c7c7c7, 0.1em 0.1em .4em #9c9c9c"}} src={musicNinjas} alt="music ninjas logo"/>
                </div>
            </header>
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
                <hr/>
                <div className="d-flex align-content-start align-items-center flex-wrap">
                    {favorites.map((track, index) => (
                            <div key={index} className="d-inline-flex flex-wrap m-2 justify-content-center align-items-start border border-dark rounded-lg p-2"
                                style={{ width: '18.53%', minHeight: "24vh", backgroundColor: "#3c415c" }}>
                                <Link to={`/details/${track.songId}`}><img style={{ width: '100%' }} src={track.image} alt="" /></Link>
                                <div className="align-self-end">
                                    <div className="text-white" style={{ width: "100%", overflow: "hidden", maxHeight: "8vh" }}><Link style={{ "text-decoration": "none", }}to={`/details/${track.songId}`}>{track.name}</Link></div>
                                    <div className="text-muted">{track.artist}</div>
                                    <Button className="align-self-end" variant="contained" color="secondary" onClick={() => deleteSong(userId, track.songId)} ><DeleteForeverOutlinedIcon  style={{fontSize: "28px", color:"white",marginTop: "1px"}} /></Button>
                                </div>
                            </div>
                    ))
                    
                    }
                </div>
            </Container>
        </div>
    )
}
