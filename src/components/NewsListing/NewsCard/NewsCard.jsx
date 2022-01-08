import React from 'react';
import { DateTime } from 'luxon';

import { NO_IMAGE_URL, UNKNOWN_PUBLISHED_DATE, UNKNOWN_SOURCE } from '../../../shared/contants';
import { onImageLoadingError } from '../../../shared/utils';

import './NewsCard.scss';

const NewsCard = ({onSelectNews, news }) => {
    const { title, publishedAt } = news;
    const urlToImage = news.urlToImage || NO_IMAGE_URL;
    const sourceFromTitleIdx = (title && title.lastIndexOf("-")) || -1;

    let sourceFromTitle = UNKNOWN_SOURCE;
    let titleToUse = title;
    if (sourceFromTitleIdx !== -1) {
        sourceFromTitle = title.substring(sourceFromTitleIdx + 2);
        titleToUse = title.substring(0, sourceFromTitleIdx);
    }
    const publishedDate = publishedAt
        ? DateTime
            .fromISO(publishedAt)
            .toLocaleString(DateTime.DATETIME_SHORT)
        : UNKNOWN_PUBLISHED_DATE;

    return (
        <section className='news-card-container' onClick={() => onSelectNews(news)}>
            <figure className='news-image'>
                <img
                    src={urlToImage}
                    loading='lazy'
                    onError={onImageLoadingError}
                    alt='' // The API returns no description of the image
                />
            </figure>
            <div className="title-source-date-container">
                <h1 className='news-title'>{titleToUse}</h1>
                <p className="news-source-date">
                    <strong>{sourceFromTitle}</strong> | {publishedDate}
                </p>
            </div>
        </section>
    );
};
 
export default NewsCard;