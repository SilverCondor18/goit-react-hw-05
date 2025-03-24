import ClipLoader from 'react-spinners/ClipLoader'

import { useState, useEffect, Suspense, lazy } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import { Toaster } from 'react-hot-toast'

const loaderCss = {
  display: "block",
  margin: "0 auto"
};

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({ largeImage: "", description: "" });
  const [errorVisible, setErrorVisible] = useState(false);

  const loadMore = async () => {
    setLoaderVisible(true);
    setLoadMoreVisible(false);
    setErrorVisible(false);
    try {
      const results = await searchImages(query, page);
      setImages(prevImages => [...prevImages, ...results.results]);
      setLoadMoreVisible(page < results.total_pages);
    }
    catch(error)
    {
      setErrorVisible(true);
    }
    finally
    {
      setLoaderVisible(false);
    }
  }

  useEffect(() => {
    if (query == '')
    {
      return;
    }
    setImages([]);
    setPage(1);
    querySearch(query);
  }, [query]);

  useEffect(() => {
    if (page == 1) {
      return;
    }
    loadMore();
  }, [page]);

  const querySearch = async query => {
    setLoaderVisible(true);
    setLoadMoreVisible(false);
    setErrorVisible(false);
    try {
      const results = await searchImages(query, 1);
      setImages(results.results);
      setLoadMoreVisible(page < results.total_pages);
    }
    catch(error)
    {
      setErrorVisible(true);
    }
    finally
    {
      setLoaderVisible(false);
    }
  };

  const handleSearch = query => {
    setQuery(query);
  }

  const loadMoreHandler = () => {
    setPage(prevPage => prevPage + 1);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleOpenModal = (largeImage, description) => {
    setModalInfo({
      largeImage: largeImage,
      description: description
    });
    openModal();
  }

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {images.length > 0 && <ImageGallery images={images} openModal={handleOpenModal} />}
      <ClipLoader color="blue" size="150px" loading={loaderVisible} cssOverride={loaderCss} />
      {loadMoreVisible && <LoadMoreBtn onClick={loadMoreHandler} />}
      {errorVisible && <ErrorMessage />}
      <ImageModal largeImage={modalInfo.largeImage} description={modalInfo.description} closeModal={closeModal} isOpen={isModalOpen} />
    </>
  )
}

export default App
