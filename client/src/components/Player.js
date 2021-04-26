// import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = (props) => {
    // const [play, setPlay] = useState(false)

    // useEffect(() => setPlay(true), [props.trackUri])

    if (!props.accessToken) {
        return null;
    } else {
        return (
            <SpotifyPlayer
            token={props.accessToken}
            // callback={state => {
            //     if (!state.isPlaying) setPlay(false)
            // }}
            // play={play}
            uris={props.trackUri ? [props.trackUri] : []}
            />
        )
    }
}


export default Player;