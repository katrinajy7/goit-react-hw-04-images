// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101'
//       }}
//     >
//       React homework ay unoy problema gayud
//     </div>
//   );
// };



import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from './servises/Api'; 
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

 useEffect(() => {
    if (!searchQuery) return;
    getImages(searchQuery, page);
  }, [searchQuery, page]); 