import React, { useState, useEffect } from "react";
import Video from '../Video';
import Playlist from './Playlist';
import { ThemeProvider } from "styled-components";
import StyledPlayer from '../styles/StyledPlayer';

const theme = {
    bgcolor: '#353535',
    bgcolorItem: '#414141',
    bgcolorItemActive: '#405c63',
    bgcolorPlayed: '#526d4e',
    border: 'none',
    borderPlayed: 'none',
    color: '#fff',
}

const themeLight = {
    bgcolor: '#fff',
    bgcolorItem: '#fff',
    bgcolorItemActive: '#80a7b1',
    bgcolorPlayed: '#7d9979',
    border: '1px solid #353535',
    borderPlayed: 'none',
    color: '#353535',
}

const Player = ({ match, history, location }) => {
    const videos = JSON.parse(document.querySelector('[name="videos"]').value);
    const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`));
    
    const [state, setState] = useState({
        videos: savedState ? savedState.videos : videos.playlist,
        activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
        nightMode: savedState ? savedState.nightMode : true,
        playlistId: savedState ? savedState.playlistId : videos.playlistId,
        autoplay: false
    });

    useEffect(() => {
        localStorage.setItem(`${state.playlistId}`, JSON.stringify({...state}))
    }, [state]);
    
    useEffect(() => {
        const videoId = match.params.activeVideo;
        if(videoId !== undefined) {
            const newActiveVideo = state.videos.findIndex(video => video.id === videoId);
            setState((prev) => ({
                ...prev,
                activeVideo: prev.videos[newActiveVideo],
                autoplay: location.autoplay
            }));
        } else {
            history.push({
                pathname: `/${state.activeVideo.id}`,
                autoplay: false
            })
        }
    }, [history, location.autoplay, match.params.activeVideo, state.activeVideo.id, state.videos]);
    
    const nightModeCallback = () => {
        setState(prev => ({...prev, nightMode: !prev.nightMode}));
    };

    const endCallback = () => {
        const videoId = match.params.activeVideo;
        const currentVideoIndex = state.videos.findIndex(video => video.id === videoId);
        const nextVideo = currentVideoIndex === state.videos.length-1 ? 0 : currentVideoIndex+1;
        history.push({
            pathname: `/${state.videos[nextVideo].id}`,
            autoplay: false
        });
    };

    const progressCallback = e => {
        if(e.playedSeconds > 10 && e.playedSeconds < 11) {
            const videos = [...state.videos];
            const playedVideo = videos.find(vid => vid.id === state.activeVideo.id);
            playedVideo.played = true;
            setState(prev => ({...prev, videos}));
        }
    };
    
    return (
        <ThemeProvider theme={state.nightMode ? theme : themeLight}>
            {state.videos !== null ? (
                <StyledPlayer>
                    <Video active={state.activeVideo} autoplay={state.autoplay} endCallback={endCallback} progressCallback={progressCallback} />
                    <Playlist videos={state.videos} active={state.activeVideo} nightMode={state.nightMode} nightModeCallback={nightModeCallback} />
                </StyledPlayer>
            ) : null}
        </ThemeProvider>
    );
};

export default Player;