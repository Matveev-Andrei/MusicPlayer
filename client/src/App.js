import './App.css';
import Home from './components/Home';
import Library from './components/Library';
import Details from './components/Details';
import {Router} from '@reach/router';
import useAuth from './components/useAuth'
import Favorites from './components/Favorites'
import SpotifyWebApi from 'spotify-web-api-node';


const code = new URLSearchParams(window.location.search).get("code");

// const oauthToken = 'BQD_OEa3K12JwEwBgFxuEDoQVfoOuubn6Oex4A7UYGFbFT_qAhVX_AFDBdpvRRqFuUp77sNhoHmzK-RoTnv2lEbpNpt8cfXYN2U2u-JFNmIMINpKmgg_fe7q5psnhpq2tyDmcftoFns4ucMOJwgpd7RCzwMN5N6aJG7wb4hV4XJBhkEAlwAxoH67Le5-nZD7SGGAPaHDIDhQSQvYr4WBESt2F0xvpkpijCsNnXjMtLwzIhgt8J6puig_yS113ZPeBgatLL6IDub7yNzyDiC09u4m9rtBLUSJydjJ_LcwqYOk';

function App() {
  const spotifyApi = new SpotifyWebApi({
    clientId: "3c1ea11d29eb442c95c650380ba9f81b"
  })
  const accessToken = useAuth(code)
  const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=3c1ea11d29eb442c95c650380ba9f81b&response_type=code&redirect_uri=http://localhost:3000/library&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

  console.log(accessToken)
  return (

    <div className="App">
          <Router>
            <Home accessToken={accessToken} code={code} auth={AUTH_URL} path="/" />
            <Library accessToken={accessToken} code={code} path="/library" />
            <Details accessToken={accessToken} code={code} path="/details/:_id" />
            <Favorites spotifyApi={spotifyApi} accessToken={accessToken} code={code} path="/favorites"/>
          </Router>
    </div>

      /* <div className="App">
          <Details code={oauthToken} id='3n3Ppam7vgaVa1iaRUc9Lp'/>
          <Home />
      </div> */
  );
}

export default App;
