import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPhoto, searchPhotos } from '../api/endpoints';

import Photo from './Photo';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';
const QUERY = 'super human';

const Carousel = (props) => {

  const [ photos, setPhotos ] = useState([]);
  const [ currentPhotoIndex, setCurrentPhotoIndex ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(null);
  const [ currentPhotoMetaData, setCurrentPhotoMetaData ] = useState(null);
  const [ totalPhotos, setTotalPhotos ] = useState(null);

  useEffect(() => {
    // fetch search
    searchPhotos(QUERY).then(res => {
      // validate has photos
      setPhotos(res.data);
      setCurrentPhotoIndex(0);
      setTotalPhotos(res.meta.total);
      setCurrentPage(1);
    });
  }, []); // on mount

  useEffect(() => {
    if(currentPhotoIndex >= photos.length - 1) {
      if(totalPhotos <= photos.length) return; // early exit, endpiint is out of photoss

      searchPhotos(QUERY, currentPage + 1).then(res => {
        // validate has photos
        setPhotos(photos.concat(res.data));
        setCurrentPage(currentPage + 1);
        setTotalPhotos(res.meta.total); // necessary?

        updateCurrentPhotoMetaData();
      });

    } else {
      // get photo meta data
      updateCurrentPhotoMetaData();
    };
  }, [ currentPhotoIndex ]); // on photo index change

  if(!Number.isInteger(currentPhotoIndex) || !photos.length) return <span>Loading...</span>; // no photos yet

  // get photo URLs
  const currentPhotoUrl = photos[currentPhotoIndex]['urls']['regular'];

  let nextPhotoUrl, lastPhotoUrl;

  if(photos.length > (currentPhotoIndex + 1)) {
    // still have photos, simple + 1 offset
    nextPhotoUrl = photos[currentPhotoIndex + 1]['urls']['regular'];
  }

  if(currentPhotoIndex > 0) lastPhotoUrl = photos[currentPhotoIndex - 1]['urls']['regular'];

  // end get photo URLs

  const previousPhotoClick = () => {
    setCurrentPhotoIndex(currentPhotoIndex - 1);
  }

  const nextPhotoClick = () => {
    setCurrentPhotoIndex(currentPhotoIndex + 1);
  }

  const updateCurrentPhotoMetaData = () => {
    const currentPhoto = photos[currentPhotoIndex];

    if(!currentPhoto) return;

    getPhoto(currentPhoto['id']).then(res => {
      const {
        views,
        downloads,
        likes,
      } = res;

      setCurrentPhotoMetaData({
        views,
        downloads,
        likes,
      });
    });
  }

  return (
    <>
    <CarouselContainer>
      {
        lastPhotoUrl ?
        <Photo
          photoUrl={ lastPhotoUrl }
          type={ SECONDARY }
          handleClick={ previousPhotoClick }
        />
        : null
      }

      <Photo
        photoUrl={ currentPhotoUrl }
        type={ PRIMARY }
      />

      {
        nextPhotoUrl ?
        <Photo
          photoUrl={ nextPhotoUrl }
          type={ SECONDARY }
          handleClick={ nextPhotoClick }
        />
        : null
      }
    </CarouselContainer>
      {
        currentPhotoMetaData ?
        <div>
          <p>Likes: { currentPhotoMetaData['likes'] }</p>
          <p>Downloads: { currentPhotoMetaData['downloads'] }</p>
          <p>Views: { currentPhotoMetaData['views'] }</p>
        </div>
        : null
      }
    </>
  );
}

export default Carousel;

const CarouselContainer = styled.div`
  display: block;
`;
