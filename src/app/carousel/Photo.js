import React from 'react';
import styled from 'styled-components';

const Photo = ({ type, photoUrl, handleClick }) => {
  console.log(photoUrl);

  return (
    <PhotoContainer className={ type }>
      <img
        src={ photoUrl }
        onClick={ handleClick }
        alt="photo"
      />
    </PhotoContainer>
  );
}

export default Photo;

const PhotoContainer = styled.div`
  display: inline-block;
  padding: 10px;

  &.primary {
    width: 300px;
    height: 300px;
  }
  &.secondary {
    width: 150px;
    height: 150px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    cursor: pointer;
  }
`;
