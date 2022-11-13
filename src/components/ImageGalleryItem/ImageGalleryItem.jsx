import propTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onClick }) => {
    return images.map(image => (
        <li
            onClick={() => onClick(image.id)}
            key={image.id}
            className={style.ImageGalleryItem}
        >
            <img className={style.image} src={image.webformatURL} alt={image.tags} />
        </li>
    ));
};

ImageGalleryItem.propTypes = {
    images: propTypes.array.isRequired,
    onClick: propTypes.func.isRequired
};