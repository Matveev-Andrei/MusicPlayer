import React, {useState, useEffect} from 'react';
import {Link} from '@reach/router';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "3c1ea11d29eb442c95c650380ba9f81b"
})

const Library = (props) => {
    const [userId, setUserId] = useState();
    
    const accessToken = props.accessToken

        console.log(accessToken)
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
            setUserId(res.data.id);
        })
        .catch((err) => {
            console.log("Error found when creating user", err);
        });
    }, [accessToken])


    return (
        <div>
            <Link to={"/details/3n3Ppam7vgaVa1iaRUc9Lp"}>details</Link>
        </div>
    )
}

export default Library;