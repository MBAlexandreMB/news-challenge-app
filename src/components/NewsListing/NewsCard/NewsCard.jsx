import React from 'react';
import { NO_IMAGE_URL } from './constants';

import './NewsCard.scss';

const NewsCard = ({ news: { title, description, urlToImage } }) => {
    urlToImage = urlToImage || NO_IMAGE_URL;

    return (
        <div className='news-card-container'>
            <div className='news-title-image-container'>
                <div>
                    <p className='news-title'>{title}</p>
                    <p className='news-subtitle'>{description}</p>
                </div>
                <figure className='news-image'>
                    <img src={urlToImage} alt='' />
                </figure>
            </div>
        </div>
    );
};
 
export default NewsCard;