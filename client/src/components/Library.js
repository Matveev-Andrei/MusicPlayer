import React, {useState, useEffect} from 'react';
import {Link} from '@reach/router';
import SpotifyWebApi from 'spotify-web-api-node';
import {Form} from 'react-bootstrap';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "3c1ea11d29eb442c95c650380ba9f81b"
})

const Library = (props) => {
 //searchbar
    const [userId, setUserId] = useState();
    
// main
    const accessToken = props.accessToken
    // console.log(accessToken)

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectTrack, setSelectTrack] = useState("");
    
    function chooseTrack(trackId) {
        setSelectTrack(trackId);
        setSearch("");
    }

    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [ accessToken ]);

    // this is to create a user
    useEffect(() => {
        if(!accessToken) return 
        
        axios.post('http://localhost:3001/create', {
            accessToken
        })
        .then(res => {
            console.log(res.data);
            setUserId(res.data._id);
        })
        .catch((err) => {
            console.log("Error found when creating user", err);
        });
    }, [accessToken])

    //this is for the search bar
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if(!accessToken) return;

        let cancel = false;

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults( 
                res.body.tracks.items.map(track => {
                
                    return {
                        title: track.name,
                        artist: track.artists[0].name,
                        _id: track.id,
                    }
                })
            )
        })
        return () => (cancel = true)
    }, [search, accessToken])



    return (
        <div>
            <h1 style={{"margin": "20px", "textAlign": "left"}}>Music Ninjas</h1>
            <br />
            <br />
            <div style={{"display": "flex", "justifyContent": "space-around"}}>
                <h1 style={{"margin": "20px", "textAlign": "left", "fontSize": "45px"}}>Your library</h1>
                <Form.Control 
                    type="search"
                    placeholder="Search Songs or Artists"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{"textAlign": "center", "height": "50px", "width": "280px", "borderRadius": "10px", "margin": "auto"}}
                />
            </div>

            <table style={{"border" : "1px solid white", "margin": "60px"}}>
                <thead >
                    <th style={{"textAlign": "center", "padding" : "20px", "fontWeight": "bold", "fontSize": "25px"}}>Song</th>
                    <th style={{"textAlign": "center", "padding" : "20px", "fontWeight": "bold", "fontSize": "25px"}} >Artist</th>
                    <th style={{"textAlign": "center", "padding" : "20px", "fontWeight": "bold", "fontSize": "25px"}} >Actions</th>
                </thead>
                <tbody>
                    {
                            searchResults.map( (track, index) => ( 
                                <tr key={index}>
                                    <td style={{"textAlign": "left"}}>{track.title}</td>
                                    <td style={{"textAlign": "left"}}>{track.artist}</td>
                                    <td><button style={{"background": "lightBlue"}} onClick={() => chooseTrack(track._id)} >Add</button> <span>  |  </span> <Link to={`/details/${track._id}`}> Details </Link> </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Library;