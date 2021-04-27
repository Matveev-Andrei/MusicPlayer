import React, {useState, useEffect} from 'react';
import Player from "./Player";
// import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

// const spotifyApi = new SpotifyWebApi({

//     //not sure if we should all use one clientId? 
//     clientId: "3c1ea11d29eb442c95c650380ba9f81b",
// })


const Details = (props) => {
    const accessToken = props.accessToken
    const [song, setSong] = useState({});  
    const [albumImage, setAlbumImage] = useState({});
    const [artist, setArtist] = useState({});
    const [year, setYear] = useState("");
    const [albumName, setAlbumName] = useState({});

    // useEffect(() => {
    //     if (!accessToken) {
    //         return null;
    //     } else {
    //         spotifyApi.setAccessToken(accessToken)
    //     }
    // }, []);

    // useEffect(() => {
    //     if(!accessToken) {
    //         return null;
    //     } else {            
    //         spotifyApi.getTrack(props._id)
    //         .then((res) => {
    //             console.log(res.data);
    //             setSong(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     }
    // }, [])


    useEffect(() => {
        axios("https://api.spotify.com/v1/tracks/" + props._id, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + accessToken}
        })
        .then(res => {
            setSong(res.data);
            setAlbumImage(res.data.album.images[0]);
            setArtist(res.data.artists[0]);
            setYear(res.data.album.release_date);
            setAlbumName(res.data.album);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [props._id, accessToken]);


    return (
        <div>
                <h1 style={{"margin": "20px", "textAlign": "left"}}>Music Ninjas</h1>
                <br />
                    <div style={{"textAlign": "left", "marginLeft": "60px"}}>
                        <img src={albumImage.url} alt={song.name} />
                    </div>
                <br />
                <table style={{"border" : "1px solid white", "margin": "60px"}}>
                    <tbody>
                        <tr>
                            <td style={{"textAlign": "right", "padding" : "10px", "fontWeight": "bold"}}>Song: </td>
                            <td style={{"textAlign": "left"}}>{song.name}</td>
                        </tr>
                        <tr>
                            <td style={{"textAlign": "right", "padding" : "10px", "fontWeight": "bold"}}>Artist: </td>
                            <td style={{"textAlign": "left"}}>{artist.name}</td>
                        </tr>
                        <tr>
                            <td style={{"textAlign": "right", "padding" : "10px", "fontWeight": "bold"}}>Year: </td>
                            <td style={{"textAlign": "left"}}>{year.slice(0,4)}</td>
                        </tr>
                        <tr>
                            <td style={{"textAlign": "right", "padding" : "10px", "fontWeight": "bold"}}>Album: </td>
                            <td style={{"textAlign": "left"}}>{albumName.name}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <Player accessToken={accessToken} trackUri={song.uri} />
        </div>
    )
}

export default Details;