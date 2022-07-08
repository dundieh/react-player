import styled from "styled-components";

const StyledPlaylistitems = styled.div`
  padding: 0 20px 0 20px;
  overflow-y: auto;
  height: 26vw;
  max-height: 380px;

  /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default StyledPlaylistitems;