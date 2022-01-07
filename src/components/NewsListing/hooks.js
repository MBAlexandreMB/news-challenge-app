import { useState, useEffect } from 'react';
import { getNews } from './api';

const useGetNews = () => {
    const [news, setNews] = useState([]);
    const [newsError, setNewsError] = useState(null);

    useEffect(() => {
        getNews(setNews, setNewsError);
    }, [setNews, setNewsError]);

    return [news, newsError];
};

export { useGetNews };