import './App.css';
import Home from './components/Home';
import Library from './components/Library';
import Details from './components/Details';
import {Router} from '@reach/router';

const code = new URLSearchParams(window.location.search).get("code");

// const oauthToken = 'BQD_OEa3K12JwEwBgFxuEDoQVfoOuubn6Oex4A7UYGFbFT_qAhVX_AFDBdpvRRqFuUp77sNhoHmzK-RoTnv2lEbpNpt8cfXYN2U2u-JFNmIMINpKmgg_fe7q5psnhpq2tyDmcftoFns4ucMOJwgpd7RCzwMN5N6aJG7wb4hV4XJBhkEAlwAxoH67Le5-nZD7SGGAPaHDIDhQSQvYr4WBESt2F0xvpkpijCsNnXjMtLwzIhgt8J6puig_yS113ZPeBgatLL6IDub7yNzyDiC09u4m9rtBLUSJydjJ_LcwqYOk';


function App() {

  return (

    <div className="App">
          <Router>
            <Home path="/" />
            <Library code={code} path="/library" />
            <Details code={code} path="/details/:_id" />
          </Router>

    </div>
    


      /* <div className="App">
          <Details code={oauthToken} id='3n3Ppam7vgaVa1iaRUc9Lp'/>
          <Home />
      </div> */
  );
}

export default App;
