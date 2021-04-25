import React from 'react';


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=3c1ea11d29eb442c95c650380ba9f81b&response_type=code&redirect_uri=http://localhost:3000/library&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

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

            {/*  Insert Image here */}
            {/*  Add parallax effect here  */}

            <div style={{"marginTop": "15%"}}>
                <h3>Join us for an exceptional music experience</h3>

                {/*  Added button as placeholder */}
                <a href={AUTH_URL}><button>Get Started</button></a> 
            </div>
        </div>
    )
}

export default Home;