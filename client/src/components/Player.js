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
            styles={{
                sliderColor: '#1cb954',
                bgColor: "#edf0f3",
                sliderHandleColor : "#1db954"
            }}
            showSaveIcon
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