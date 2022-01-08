import React from 'react';
import { DateTime } from 'luxon';

import { NO_IMAGE_URL } from '../../../shared/contants';
import { onImageLoadingError } from '../../../shared/utils';

import './NewsCard.scss';

const NewsCard = ({onSelectNews, news }) => {
    const { title, publishedAt } = news;
    const urlToImage = news.urlToImage || NO_IMAGE_URL;
    const sourceFromTitleIdx = title.lastIndexOf("-");
    const sourceFromTitle = title.substring(sourceFromTitleIdx + 2);
    const titleToUse = title.substring(0, sourceFromTitleIdx);
    const publishedDate = DateTime
        .fromISO(publishedAt)
        .toLocaleString(DateTime.DATETIME_SHORT);

    return (
        <div className='news-card-container' onClick={() => onSelectNews(news)}>
            <div className='news-title-image-container'>
                <figure className='news-image'>
                    <img
                        src={urlToImage}
                        loading='lazy'
                        onError={onImageLoadingError}
                        alt='' />
                </figure>
                <div className="title-source-date-container">
                    <p className='news-title'>{titleToUse}</p>
                    <p className="news-source-date">
                        <strong>{sourceFromTitle}</strong> | {publishedDate}
                    </p>
                </div>
            </div>
        </div>
    );
};
 
export default NewsCard;