import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import SpotifyWebApi from 'spotify-web-api-node';
import { Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import musicNinjas from '../images/MusicNinjas.png';
import { navigate } from '@reach/router';

// POPER IMPORT START
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

// END

const spotifyApi = new SpotifyWebApi({
    clientId: "3c1ea11d29eb442c95c650380ba9f81b"
})

const Library = (props) => {
    //searchbar
    const [userId, setUserId] = useState();

    // main
    const accessToken = props.accessToken
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectTrack, setSelectTrack] = useState({});
    const [confirmMsg, setConfirmMsg] = useState("");

    // POPER START
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // POPER END

    const chooseTrack = (track) => {
        axios.put(`http://localhost:3001/addsong/${userId}`, {
            songId: selectTrack._id,
            name: selectTrack.title,
            artist: selectTrack.artist,
            image: selectTrack.image

        }).then((res) => {
            console.log(res.data);
            setConfirmMsg(`Successfully added! Click Favorites from MENU to view all added songs.`)
        })
            .catch((err) => console.log(err))
        setSearch("");
    }



    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    // this is to create a user
    useEffect(() => {
        if (!accessToken) return

        axios.post('http://localhost:3001/create', {
            accessToken
        })
            .then(res => {
                // console.log(res.data);
                setUserId(res.data._id);
            })
            .catch((err) => {
                console.log("Error found when creating user", err);
            });
    }, [accessToken])

    //this is for the search bar
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;

        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track => {
                    return {
                        title: track.name,
                        artist: track.artists[0].name,
                        _id: track.id,
                        image: track.album.images[0].url
                    }
                })
            )
        })
        return () => (cancel = true)
    }, [search, accessToken])



    return (
        <div style={{ height: '100vh' }} className="bg-light">
                <header className="p-4 bg-light mb-5 d-flex justify-content-between"  >
                    <div className="mx-auto" style={{ display: "flex", justifyContent: "center", }}>
                    <img className="border rounded-lg" style={{height : "150px", boxSizing:"border-box", boxShadow:"6px 4px 4px #c7c7c7, 0.1em 0.1em .4em #9c9c9c"}} src={musicNinjas} alt="music ninjas logo"/>
                    </div>
                    <div className="m-3">
                        <Button
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            variant="contained"
                            onClick={handleToggle}
                            color="primary"
                        >
                        Menu
                        </Button>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                                                <MenuItem onClick={() => navigate('/favorites')}>Favorites</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </header>
            <Form.Control
                type="search"
                placeholder="Search Songs or Artists"
                value={search}
                onChange={e => {setSearch(e.target.value); setConfirmMsg("")}}
                className="mx-auto mt-5"
                style={{ "height": "50px", "width": "25%", "borderRadius": "10px" }}
            />
            <div className="mx-auto mt-5" style={{ width: "40%", overflowY: "auto", maxHeight: "60vh" }}>
                {
                    searchResults.map((track, index) => (
                        <div key={index} style={{backgroundColor:"rgb(208, 215, 222)"}} className="d-flex m-2 align-items-center rounded-lg border border-light p-2">
                            <img src={track.image} style={{ height: "64px", width: "64px" }} alt="" />
                            <div className="ml-3 d-flex justify-content-between w-100">
                                <div style={{ maxWidth: "35%" }}>
                                    <div style={{textAlign: "left"}}>{track.title}</div>
                                    <div style={{textAlign: "left"}} className="text-muted">{track.artist}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button onMouseDown={() => setSelectTrack(track)} onClick={() => chooseTrack(track)} className="btn btn-success">Add to Favorites</button>
                                    <Link className="ml-4 btn btn-outline-success" to={`/details/${track._id}`}> Play </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                { confirmMsg ? 
                    <Alert style={{fontSize: "20px", verticalAlign: "center", width: "700px", margin: "auto"}}variant="success"> {confirmMsg} </Alert> :
                    null
                }
            </div>
        </div>
    )
}

export default Library;