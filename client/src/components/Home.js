import guitar from '../images/guitar.jpg'; //strength: 600
import turntable from '../images/turntable.jpg'; //strength: 600
import acousticGuitar from '../images/acoustic_guitar.jpg'; //strength:700
import React from 'react';
import karaoke from '../images/karaoke.png';
import { Parallax } from 'react-parallax';
import cheers2 from '../images/cheers2.jpg'; //strength: 400
import musicNinjas from '../images/MusicNinjas.png';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import WebIcon from '@material-ui/icons/Web';

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
            <header className="p-4 bg-light"  >
                <div style={{ "display": "flex", "justifyContent": "center", }}>
                    <img style={{height : "150px", boxSizing:"border-box", boxShadow:"6px 4px 4px #c7c7c7, -0em 0.1em .4em #a7a7a7"}} src={musicNinjas} alt=""/>
                </div>
            </header>
            <main style={{backgroundColor:"#edf0f3" }}>
                <Parallax className="mb-5" bgImage={cheers2} bgImageAlt="guitar" strength={400}>
                    <div style={{ height: '80vh' }}>
                        <div style={insideStyles}>
                            <h1 className="text-black">Join us for an exceptional music experience</h1>
                            <a href={AUTH_URL}><button style={{textAlign:"center", cursor: "pointer", "border": "1px solid peachpuff", "borderRadius": "5px", "width": "200px", "height": "40px", "backgroundColor": "SandyBrown", "color": "whitesmoke", "fontWeight": "bold", "fontSize": "16px" }}>GET STARTED</button></a>
                        </div>
                    </div>
                </Parallax>
                <div style={{ "height": "40vh", }}>
                    <div className="d-flex w-75 h-75 m-auto justify-content-between ">
                        <div className="w-25">
                            <LibraryMusicIcon className="mb-3" style={{fontSize: "75px", color:"#141213"}}/>
                            <p className="text-center">Enjoy the vast music library that we have thanks to the Spotify web Api</p>
                        </div>
                        <div className="w-25">
                            <img className="mb-3" style={{width:"65px"}} src={karaoke} alt=""/>
                            <p className="text-center">Enjoy some karaoke with you friends thanks to our lyrics integration</p>
                        </div>
                        <div className="w-25">
                            <WebIcon className="mb-3" style={{fontSize: "75px", color:"#141213"}}/>
                            <p className="text-center">Stay amazed while navigating through our super-modern Web Design!</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer  style={{height: '50vh', background: "black"}}>
                <div style={{height: "90%"}} className="w-75 m-auto d-flex align-items-center">
                    <div style={{width: '65%'}} className="ml-5 mr-5 d-flex justify-content-between h-75">
                        <h2 className="text-white mt-4 mr-2">Music Ninjas<small>™</small></h2>
                        <div >
                            <h6 className="mb-4" style={{color: "#919496"}} >COMPANY</h6>
                            <p className="text-white text-left">About</p>
                            <p className="text-white text-left">Jobs</p>
                        </div>
                        <div >
                            <h6 className="mb-4" style={{color: "#919496"}} >COMMUNITIES</h6>
                            <p className="text-white text-left">Advertising</p>
                            <p className="text-white text-left">Investors</p>
                            <p className="text-white text-left">For Artists</p>
                            <p className="text-white text-left">Developers</p>
                        </div>
                        <div >
                            <h6 className="mb-4" style={{color: "#919496"}} >USEFUL LINKS</h6>
                            <p className="text-white text-left">Support</p>
                        </div>
                    </div>
                    <div style={{width:'15%'}} className="ml-5 d-flex justify-content-between h-75">
                        <TwitterIcon style={{fontSize: "50px", color:"#fff", backgroundColor: '#222326', borderRadius: "40px", padding : '10px' }}/>
                        <FacebookIcon style={{fontSize: "50px", color:"#fff", backgroundColor: '#222326', borderRadius: "40px", padding : '10px' }}/>
                        <InstagramIcon style={{fontSize: "50px", color:"#fff", backgroundColor: '#222326', borderRadius: "40px", padding : '10px' }}/>  
                    </div>
                </div>
                <div className="w-75 m-auto d-flex">
                    <small className="mx-5" style={{color: "#919496"}}>Legal</small>
                    <small className="mx-5" style={{color: "#919496"}}>Privacy Center</small>
                    <small className="mx-5" style={{color: "#919496"}}>Privacy Policy</small>
                    <small className="mx-5" style={{color: "#919496"}}>Cookies</small>
                    <small className="mx-5" style={{color: "#919496"}}>About Ads</small>
                </div>
            </footer>
        </div>
    )
}

export default Home;