import propTypes from 'prop-types';
import style from './Modal.module.css';

export const Modal = ({ clickImage, handleClose }) => {
    return (
        <div onClick={() => handleClose()} className={style.Overlay}>
            <div className={style.Modal}>
                <img src={clickImage.largeImageURL} alt={clickImage.tags} />
            </div>
        </div>
    );
};

Modal.propTypes = {
    clickImage: propTypes.object.isRequired,
    handleClose: propTypes.func.isRequired
};