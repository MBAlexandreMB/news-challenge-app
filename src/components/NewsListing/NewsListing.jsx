import React from 'react';

import { useGetNews } from './hooks';
import NewsCard from './NewsCard/NewsCard';

const NewsListing = () => {
    const [newsList, newsListError] = useGetNews();

    return (
        <div>
            {
                newsList.length > 0 &&
                newsList.map(newsInfo =>  <NewsCard key={newsInfo.url} news={newsInfo} />)
            }
        </div>
    );
};
 
export default NewsListing;