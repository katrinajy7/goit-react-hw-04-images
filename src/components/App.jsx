// import React, { useState, useEffect, userCallback } from 'react';
// import { fetchImages } from './servises/Api';
// import { Searchbar } from './Searchbar/Searchbar';
// import { Loader } from './Loader/Loader';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';





import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from './Servises/Api';
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

  const getImages = useCallback(async (query, pageNumber) => {
    setIsLoading(true);
    try {
      const { hits, totalHits } = await fetchImages(query, pageNumber);
      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / 12)); 
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const formSubmit = (query) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scrollOnMoreButton();
  };

  const openModal = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const scrollOnMoreButton = () => {

  };

  return (
    <>
      <Searchbar onSubmit={formSubmit} />

      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {loadMore && <Button onloadMore={onLoadMore} page={page} />}

      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal} />
      )}
    </>
  );
};

export default App;


//original code change to react hooks//
//from homework hw 3 react js
//error nasab
//buang na gayud

// import React, { Component } from 'react';
// import { fetchImages } from './servises/Api';
// import { Searchbar } from './Searchbar/Searchbar';
// import { Loader } from './Loader/Loader';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     per_page: 12,
//     isLoading: false,
//     loadMore: false,
//     error: null,
//     showModal: false,
//     largeImageURL: 'largeImageURL',
//     id: null,
//   };

//   componentDidUpdate(_, prevState) {
//     console.log(prevState.page);
//     console.log(this.state.page);
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getImages(searchQuery, page);
//     }
//   }

//   getImages = async (query, page) => {
//     this.setState({ isLoading: true });
//     if (!query) {
//       return;
//     }
//     try {
//       const { hits, totalHits } = await fetchImages(query, page);
//       console.log(hits, totalHits);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: this.state.page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   formSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       images: [],
//       page: 1,
//       loadMore: false,
//     });
//   };

//   onloadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//     this.scrollOnMoreButton();
//   };

//   openModal = largeImageURL => {
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   render() {
//     const { images, isLoading, loadMore, page, showModal, largeImageURL } =
//       this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.formSubmit} />

//         {isLoading ? (
//           <Loader />
//         ) : (
//           <ImageGallery images={images} openModal={this.openModal} />
//         )}

//         {loadMore && <Button onloadMore={this.onloadMore} page={page} />}

//         {showModal && (
//           <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
//         )}
//       </>
//     );
//   }
// }