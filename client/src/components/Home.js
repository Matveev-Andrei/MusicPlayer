import React from 'react';
import { Parallax } from 'react-parallax';
import acousticGuitar from '../images/acoustic_guitar.jpg'; //strength:700
import cheers2 from '../images/cheers2.jpg'; //strength: 400
import guitar from '../images/guitar.jpg'; //strength: 600
import turntable from '../images/turntable.jpg'; //strength: 600


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=3c1ea11d29eb442c95c650380ba9f81b&response_type=code&redirect_uri=http://localhost:3000/library&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const insideStyles = {
    background: "#fff", 
    left: '50%', 
    top: '50%', 
    position: 'absolute', 
    padding: '20px',
    transform: 'translate(-50%, -50%)',
}

const Home = () => {

    return (
        <div>
            <div style={{"margin": "20px", "display": "flex", "justifyContent": "space-between"}}>
                <h1>Music Ninjas</h1>
                
                {/*  Added buttons as placeholder */}
                <div style={{"display": "flex", "alignItems": "center"}}>
                    <button style={{"margin": "10px"}}>Sign Up</button>
                    <button style={{"margin": "10px"}}>Log In</button>
                </div>
                
            </div>
            
            <Parallax bgImage={ guitar } bgImageAlt="guitar" strength={600}>
                <div style={{height: 1000}}>
                    <div style={insideStyles}>
                        <h1>Join us for an exceptional music experience</h1>
                        <a href={AUTH_URL}><button style={{"border": "1px solid peachpuff", "borderRadius": "5px", "width": "200px", "height": "40px", "backgroundColor": "SandyBrown", "color": "whitesmoke", "fontWeight": "bold", "fontSize": "16px"}}>GET STARTED</button></a> 
                    </div>
                </div>
            </Parallax>
            <div style={{"height": "50vh"}}></div>
        </div>
    )
}

export default Home;