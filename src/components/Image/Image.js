import PropTypes from 'prop-types';
import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import styles from './Image.module.scss';
import images from '~/assets/images';

function Image({ src, className, alt, fallback: customFallback = images.noImage, ...props }, ref) {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            src={fallback || src}
            className={classNames(styles.wrapper, className)}
            alt={alt}
            ref={ref}
            {...props}
            onError={handleError}
        />
    );
}

Image.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
    fallback: PropTypes.string,
};

export default forwardRef(Image);
