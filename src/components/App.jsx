import React, { useState, useEffect } from 'react';
import { fetchImg } from './API/API.js';
import { Button } from './Button/Button.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Loader } from './Loader/Loader.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import style from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  // submitting form func fetch images from API
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading({ isLoading: true });
    const input = e.target.elements.input;
    if (input.value.trim() === '') {
      return;
    };
    const response = await fetchImg(input.value, 1);
    setImages(response);
    setIsLoading(false);
    setSearch(input.value);
    setPage(2);
  };

  // load more button func
  const loadMore = async () => {
    setIsLoading({ isLoading: true });
    const response = await fetchImg(search, page);
    setImages([...images, ...response]);
    setIsLoading(false);
    setPage(page + 1);
  }

  // enlraging the image
  const clickImage = e => {
    setModalOpen(true);
    setModalImg(e.target.name);
    setModalAlt(e.target.alt);
  }

  // closing modal window func
  const closeModal = () => {
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      };
    };
    window.addEventListener('keydown', keyDown);
  }, []);

  return (
    <div className={style.wrapper}>
      {modalOpen ? (
        <Modal src={modalImg} alt={modalAlt} handleClose={closeModal} />
      ) : null}
      <Searchbar handleSubmit={handleSubmit} />
      {isLoading && (page <= 1) ? <Loader /> : null}
      <ImageGallery>
        <ImageGalleryItem
          images={images}
          onClick={clickImage}
          loading={isLoading}
        />
      </ImageGallery>
      {isLoading && (page > 2) ? <Loader /> : null}
      {images.length === 0 ? null : (
        <Button handleClick={loadMore} />
      )}
    </div>
  );
};