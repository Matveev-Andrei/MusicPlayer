import React, {useState, useEffect} from 'react';
import {Link} from '@reach/router';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "3c1ea11d29eb442c95c650380ba9f81b"
})

const Library = (props) => {

    const accessToken = useAuth(props.code);

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
            console.log("create successful");
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