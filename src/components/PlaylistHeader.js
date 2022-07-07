import React from "react";
import StyledJourney from './styles/StyledJourney';
import StyledPlaylistHeader from './styles/StyledPlaylistHeader';

const PlaylistHeader = ({ active, total }) => {
    return (
        <StyledPlaylistHeader>
            <p>{active.title}</p>
            <StyledJourney>
                {active.num} / {total}
            </StyledJourney>
        </StyledPlaylistHeader>
    );
};

export default PlaylistHeader;