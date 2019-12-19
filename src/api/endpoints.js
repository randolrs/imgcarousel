import apiClient from '../api/client';

const GET_PHOTO_URL = '/photos';
const FETCH_PHOTOS_URL = '/search/photos';

const DEFAULT_QUERY = 'super human'

export const getPhoto = async (id) => {
  // handle undefined id
  try {
    const response = await apiClient.fetch(`${ GET_PHOTO_URL }/${id}`);

    console.log('getPhoto');
    console.log({response});

    return response;
  } catch (err) {
    console.log(err)
  }
};

export const searchPhotos = async (query = DEFAULT_QUERY, page = 1) => {
  try {
    const response = await apiClient.fetchAll(`${ FETCH_PHOTOS_URL }?query=${ query }&page=${ page }`);

    return response;
  } catch (err) {
    console.log(err)
  }
};
