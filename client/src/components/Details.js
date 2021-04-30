import React, { useState, useEffect } from 'react';
import Player from "./Player";
import {Link , navigate} from '@reach/router';
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
    const [lyrics, setLyrics] = useState("")

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

        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: song.name,
                artist: artist.name
            }
        }).then(res => {
            console.log(song)
            console.log(artist)
            setLyrics(res.data.lyrics);
        }).catch((err) => { console.log(err); })
    }, [lyrics])

    console.log(lyrics)

    useEffect(() => {
        axios("https://api.spotify.com/v1/tracks/" + props._id, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken }
        })
            .then(res => {
                setSong(res.data);
                setAlbumImage(res.data.album.images[0]);
                setArtist(res.data.artists[0]);
                setYear(res.data.album.release_date);
                setAlbumName(res.data.album);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [props._id, accessToken]);


    return (
        <div  style={{ backgroundColor: "#222326", maxHeight: "100vh" }}>
            <header className="d-flex justify-content-between" style={{ height: "15%", backgroundColor: "#1db954", padding: "20px" }}>
                <h1 style={{ color: "#fff", "textAlign": "left" }}>Music Ninjas Player🎧</h1>
                <div className="align-self-center mr-5" style={{fontSize: "large"}}>
                    <Link className="btn btn-success text-white" to="/">Home</Link>
                    <Link className="ml-4 btn btn-success text-white" to="/library">Play a different song</Link>
                    <Link className="ml-4 btn btn-success text-white" to="/favorites">Go to Favorites</Link>
                </div>
            </header>
            <main className="d-flex justify-content-between ">
                <div style={{ width: "55%" }}>
                    <div className="mt-5" style={{ "textAlign": "left", "marginLeft": "60px" }}>
                        <img style={{ height:"51.7vh"}} src={albumImage.url} alt={song.name} />
                    </div>
                    <table className="m-5">
                        <tbody>
                            <tr>
                                <td className="text-white text-left" style={{ "textAlign": "right", "padding": "10px", "fontWeight": "bold" }}>Song: </td>
                                <td className="text-white text-left" style={{ "textAlign": "left" }}>{song.name}</td>
                            </tr>
                            <tr>
                                <td className="text-white text-left" style={{ "textAlign": "right", "padding": "10px", "fontWeight": "bold" }}>Artist: </td>
                                <td className="text-white text-left" style={{ "textAlign": "left" }}>{artist.name}</td>
                            </tr>
                            <tr>
                                <td className="text-white text-left" style={{ "textAlign": "right", "padding": "10px", "fontWeight": "bold" }}>Year: </td>
                                <td className="text-white text-left" style={{ "textAlign": "left" }}>{year.slice(0, 4)}</td>
                            </tr>
                            <tr>
                                <td className="text-white text-left" style={{ "textAlign": "right", "padding": "10px", "fontWeight": "bold" }}>Album: </td>
                                <td className="text-white text-left" style={{ "textAlign": "left" }}>{albumName.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {props._id &&
                    <div className="mx-auto mt-5 text-white text-center example" style={{ width: "20%", overflowY: "auto", maxHeight: "70vh" }}>
                    {/* <iframe src="https://giphy.com/embed/5ehBR5qtLEXBe" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
                        {lyrics}
                    </div>
                }
            </main>
            <Player accessToken={accessToken} trackUri={song.uri} />
        </div>
    )
}

export default Details;