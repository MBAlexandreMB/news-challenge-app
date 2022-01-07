import React from 'react';

import { useGetNews } from './hooks';
import NewsCard from './NewsCard/NewsCard';

import './NewsListing.scss';

const NewsListing = ({ onSelectNews }) => {
    const [newsList, newsListError] = useGetNews();

    return (
        <div className='news-listing-container'>
            {
                newsList.length > 0 &&
                newsList.map(newsInfo =>  <NewsCard key={newsInfo.url} news={newsInfo} onSelectNews={onSelectNews} />)
            }
        </div>
    );
};
 
export default NewsListing;