import React from 'react';
import { NO_IMAGE_URL } from './constants';

import './NewsCard.scss';

const NewsCard = ({onSelectNews, news }) => {
    const { title, description } = news;
    const urlToImage = news.urlToImage || NO_IMAGE_URL;

    return (
        <div className='news-card-container' onClick={() => onSelectNews(news)}>
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