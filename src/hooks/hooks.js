import { useState, useEffect } from 'react';
import { getNews } from './api';

const useGetNews = setIsLoading => {
    const [news, setNews] = useState([]);
    const [newsError, setNewsError] = useState(null);

    useEffect(() => {
        getNews(setNews, setNewsError, setIsLoading);
    }, [setNews, setNewsError, setIsLoading]);

    return [news, newsError];
};

export { useGetNews };