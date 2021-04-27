import React from 'react';
import { Parallax } from 'react-parallax';
import acousticGuitar from '../images/acoustic_guitar.jpg'; //strength:700
import cheers2 from '../images/cheers2.jpg'; //strength: 400
import guitar from '../images/guitar.jpg'; //strength: 600
import turntable from '../images/turntable.jpg'; //strength: 600


const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=3c1ea11d29eb442c95c650380ba9f81b&response_type=code&redirect_uri=http://localhost:3000/library&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const insideStyles = {
    background: "transparent",
    left: '50%',
    top: '50%',
    position: 'absolute',
    padding: '20px',
    transform: 'translate(-50%, -50%)',
}

const Home = () => {

    return (
        <div>
            <header className="p-4 bg-light">
                <div style={{ "display": "flex", "justifyContent": "center" }}>
                    <h1>Music Ninjas</h1>
                </div>
            </header>
            <main>
                <Parallax className="mb-5" bgImage={cheers2} bgImageAlt="guitar" strength={400}>
                    <div style={{ height: 1000 }}>
                        <div style={insideStyles}>
                            <h1>Join us for an exceptional music experience</h1>
                            <a href={AUTH_URL}><button style={{ cursor: "pointer", "border": "1px solid peachpuff", "borderRadius": "5px", "width": "200px", "height": "40px", "backgroundColor": "SandyBrown", "color": "whitesmoke", "fontWeight": "bold", "fontSize": "16px" }}>GET STARTED</button></a>
                        </div>
                    </div>
                </Parallax>
                <div style={{ "height": "40vh" }}>
                    <div className="d-flex w-75 h-75 border border-danger m-auto justify-content-between ">
                        <div className="w-25">
                            <h3>Lorem</h3>
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Earum adipisci animi, itaque repudiandae tenetur porro dolore maiores ut accusantium error?</p>
                        </div>
                        <div className="w-25">
                            <h3>Lorem</h3>
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Earum adipisci animi, itaque repudiandae tenetur porro dolore maiores ut accusantium error?</p>
                        </div>
                        <div className="w-25">
                            <h3>Lorem</h3>
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Earum adipisci animi, itaque repudiandae tenetur porro dolore maiores ut accusantium error?</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer  style={{height: '50vh', background: "black"}}>
                <div className="w-75 m-auto">

                </div>
            </footer>
        </div>
    )
}

export default Home;