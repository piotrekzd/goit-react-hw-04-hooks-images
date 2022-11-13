import propTypes from 'prop-types';
import style from './ImageGallery.module.css'

export const ImageGallery = ({ children }) => {
    return (
        <ul className={style.ImageGallery}>
            {children}
        </ul>
    );
};

ImageGallery.propTypes = {
    children: propTypes.node.isRequired
};